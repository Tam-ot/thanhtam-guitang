"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/frames/ezgif-frame-";

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${FRAME_PREFIX}${frameNumber}.png`;
}

interface CardItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  desc: string;
  quote: string;
}

const SECTION_02_CARDS: CardItem[] = [
  {
    id: "01",
    title: "1. Your Gentle Heart",
    image: "/card-gentle-heart.jpg",
    alt: "Hoa hồng hồng phấn mềm mại",
    desc: "Sự dịu dàng không làm bạn yếu đuối. Nó là vẻ đẹp của một trái tim biết quan tâm, thấu hiểu và yêu thương.",
    quote: "“Dịu dàng, nhưng chẳng hề nhỏ bé.”",
  },
  {
    id: "02",
    title: "2. Your Inner Light",
    image: "/card-inner-light.jpg",
    alt: "Hoa lavender tím nhạt",
    desc: "Bạn có ánh sáng của riêng mình. Chẳng cần trở thành ai khác, bạn vẫn có thể tỏa sáng theo cách rất riêng.",
    quote: "“Bạn là phiên bản không thể thay thế.”",
  },
  {
    id: "03",
    title: "3. Your Quiet Strength",
    image: "/card-quiet-strength.jpg",
    alt: "Hoa trắng dưới ánh nắng sớm",
    desc: "Phía sau nụ cười có thể là bao nỗ lực. Mong bạn luôn nhớ rằng mình mạnh mẽ, và cũng xứng đáng được chở che.",
    quote: "“Mạnh mẽ và được yêu thương.”",
  },
  {
    id: "04",
    title: "4. Your Little Joys",
    image: "/card-little-joys.jpg",
    alt: "Hoa cúc trắng nhỏ trên cỏ xanh",
    desc: "Những niềm vui bé xíu, những ước mơ còn dang dở, những ngày bình yên — tất cả đều xứng đáng có một chỗ trong cuộc đời bạn.",
    quote: "“Hạnh phúc theo cách của riêng mình.”",
  },
];

interface ReminderItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  tagColor: string;
  titleColor: string;
  descColor: string;
  bg: string;
  border: string;
  glow: string;
}

const SECTION_03_REMINDERS: ReminderItem[] = [
  {
    id: "rem-1",
    tag: "A GENTLE REMINDER",
    title: "You can rest.",
    desc: "Bạn không cần lúc nào cũng phải mạnh mẽ. Nghỉ ngơi cũng là một cách để yêu thương chính mình.",
    tagColor: "#9F4A70",
    titleColor: "#4A152E",
    descColor: "#5C203B",
    bg: "rgba(253, 240, 246, 0.85)",
    border: "rgba(255, 224, 238, 0.95)",
    glow: "rgba(244, 114, 182, 0.28)",
  },
  {
    id: "rem-2",
    tag: "A LITTLE WISH",
    title: "You deserve love.",
    desc: "Mong bạn được yêu thương bằng sự chân thành, không phải bằng những điều kiện hay sự đánh đổi.",
    tagColor: "#66559C",
    titleColor: "#2C1E5C",
    descColor: "#423377",
    bg: "rgba(244, 241, 254, 0.85)",
    border: "rgba(229, 222, 255, 0.95)",
    glow: "rgba(167, 139, 250, 0.28)",
  },
  {
    id: "rem-3",
    tag: "A SOFT TRUTH",
    title: "You are enough.",
    desc: "Bạn không cần hoàn hảo để trở nên tuyệt vời. Chính những điều rất riêng đã làm nên con người bạn.",
    tagColor: "#A3662A",
    titleColor: "#4F2B07",
    descColor: "#6B3F12",
    bg: "rgba(255, 247, 237, 0.85)",
    border: "rgba(254, 230, 205, 0.95)",
    glow: "rgba(251, 146, 60, 0.28)",
  },
  {
    id: "rem-4",
    tag: "A LITTLE COURAGE",
    title: "Keep dreaming.",
    desc: "Đừng ngại mơ những giấc mơ lớn, cũng đừng quên nâng niu những niềm vui nhỏ.",
    tagColor: "#38775B",
    titleColor: "#12422E",
    descColor: "#235840",
    bg: "rgba(240, 252, 244, 0.85)",
    border: "rgba(215, 247, 228, 0.95)",
    glow: "rgba(74, 222, 128, 0.28)",
  },
  {
    id: "rem-5",
    tag: "A WISH FOR YOU",
    title: "Choose yourself.",
    desc: "Mong bạn luôn đủ can đảm để lắng nghe trái tim mình và chọn điều khiến bản thân thật sự hạnh phúc.",
    tagColor: "#8C497B",
    titleColor: "#451538",
    descColor: "#5E224E",
    bg: "rgba(253, 241, 249, 0.85)",
    border: "rgba(250, 220, 244, 0.95)",
    glow: "rgba(232, 121, 249, 0.28)",
  },
  {
    id: "rem-6",
    tag: "A PROMISE",
    title: "Better days await.",
    desc: "Mong những ngày phía trước sẽ dịu dàng hơn, với nhiều tin vui và những bất ngờ khiến bạn mỉm cười.",
    tagColor: "#A85338",
    titleColor: "#571F0F",
    descColor: "#732F1A",
    bg: "rgba(255, 241, 237, 0.85)",
    border: "rgba(254, 222, 214, 0.95)",
    glow: "rgba(251, 113, 133, 0.28)",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Section 01 Hero elements refs
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLabelRef = useRef<HTMLDivElement>(null);
  const heroTitleL1Ref = useRef<HTMLSpanElement>(null);
  const heroTitleL2Ref = useRef<HTMLSpanElement>(null);
  const heroPodRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLButtonElement>(null);

  // Section 02 refs
  const section02Ref = useRef<HTMLElement>(null);
  const s2ContentWrapperRef = useRef<HTMLDivElement>(null);
  const s2HeaderRef = useRef<HTMLDivElement>(null);
  const s2CardsContainerRef = useRef<HTMLDivElement>(null);

  // Section 03 refs
  const section03Ref = useRef<HTMLElement>(null);
  const s3ContentWrapperRef = useRef<HTMLDivElement>(null);
  const s3HeaderRef = useRef<HTMLDivElement>(null);
  const s3CardsContainerRef = useRef<HTMLDivElement>(null);

  // Section 03 interactive card expand state: only 1 card open at a time
  const [activeCardId, setActiveCardId] = useState<string | null>("rem-1");

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  };

  // Section 04 refs
  const section04Ref = useRef<HTMLElement>(null);
  const s4ContentWrapperRef = useRef<HTMLDivElement>(null);
  const s4HeaderRef = useRef<HTMLDivElement>(null);
  const s4EnvelopeRef = useRef<HTMLDivElement>(null);
  const s4SealRef = useRef<HTMLDivElement>(null);
  const s4TextRef = useRef<HTMLDivElement>(null);
  const s4CtaRef = useRef<HTMLDivElement>(null);

  // Section 04 letter open state
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLetterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // When letter modal is open, pause Lenis smooth scroll so background doesn't move
  useEffect(() => {
    if (isLetterOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLetterOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // 0. Initialize Lenis Smooth Scroll for buttery 60fps momentum
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Respect prefers-reduced-motion for accessibility
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const yShift = prefersReducedMotion ? 0 : 20;
    const yShiftSmall = prefersReducedMotion ? 0 : 15;
    const yShiftCard = prefersReducedMotion ? 0 : 24;

    // 2. Section 02: Scroll-triggered Layer-by-Layer Sequential Reveal (Frame 110 Astronaut)
    let s2Tl: gsap.core.Timeline | null = null;
    if (section02Ref.current) {
      const s2Title = s2HeaderRef.current?.querySelector("h2");
      const s2Subtitle = s2HeaderRef.current?.querySelector("p");
      const s2Cards = s2CardsContainerRef.current?.querySelectorAll(".glass-card");

      // Initial state: hidden with subtle displacement
      if (s2Title) gsap.set(s2Title, { opacity: 0, y: yShift });
      if (s2Subtitle) gsap.set(s2Subtitle, { opacity: 0, y: yShiftSmall });
      if (s2Cards && s2Cards.length > 0) gsap.set(s2Cards, { opacity: 0, y: yShiftCard });

      s2Tl = gsap.timeline({
        paused: true,
      });

      // Step 1: Tiêu đề chính xuất hiện trước
      if (s2Title) {
        s2Tl.to(
          s2Title,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          0
        );
      }

      // Step 2: Tiêu đề phụ xuất hiện sau tiêu đề chính (độ trễ 180ms)
      if (s2Subtitle) {
        s2Tl.to(
          s2Subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.18
        );
      }

      // Step 3: 4 Glass Cards lần lượt xuất hiện từ trái qua phải (bắt đầu sau phụ đề 180ms, stagger 160ms)
      if (s2Cards && s2Cards.length > 0) {
        s2Tl.to(
          s2Cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.16,
            ease: "power2.out",
          },
          0.36
        );
      }

      ScrollTrigger.create({
        trigger: section02Ref.current,
        start: "top 78%",
        end: "bottom 18%",
        toggleActions: "play reverse play reverse",
        animation: s2Tl,
      });
    }

    // 4. Section 03: Scroll-triggered Layer-by-Layer Sequential Reveal (Frame 190 Floral Vortex)
    let s3Tl: gsap.core.Timeline | null = null;
    if (section03Ref.current) {
      const s3Title = s3HeaderRef.current?.querySelector("h2");
      const s3Subtitle = s3HeaderRef.current?.querySelector("p");
      const s3Cards = s3CardsContainerRef.current?.querySelectorAll(".reminder-card");

      // Initial state
      if (s3Title) gsap.set(s3Title, { opacity: 0, y: yShift });
      if (s3Subtitle) gsap.set(s3Subtitle, { opacity: 0, y: yShiftSmall });
      if (s3Cards && s3Cards.length > 0) gsap.set(s3Cards, { opacity: 0, y: yShiftCard });

      s3Tl = gsap.timeline({
        paused: true,
      });

      // Step 1: Tiêu đề chính xuất hiện trước
      if (s3Title) {
        s3Tl.to(
          s3Title,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          0
        );
      }

      // Step 2: Tiêu đề phụ xuất hiện sau (độ trễ 180ms)
      if (s3Subtitle) {
        s3Tl.to(
          s3Subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.18
        );
      }

      // Step 3: 6 Reminder Cards lần lượt xuất hiện từ trên xuống dưới, trái sang phải (bắt đầu sau phụ đề 180ms, stagger 150ms)
      if (s3Cards && s3Cards.length > 0) {
        s3Tl.to(
          s3Cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.36
        );
      }

      ScrollTrigger.create({
        trigger: section03Ref.current,
        start: "top 78%",
        end: "bottom 18%",
        toggleActions: "play reverse play reverse",
        animation: s3Tl,
      });
    }

    // 5. Section 04: Scroll-triggered Layer-by-Layer Sequential Reveal (Frame 280 Grand Bouquet)
    let s4Tl: gsap.core.Timeline | null = null;
    if (section04Ref.current) {
      const s4Title = s4HeaderRef.current?.querySelector("h2");
      const s4Subtitle = s4HeaderRef.current?.querySelector("p");

      // Initial state: all elements hidden with initial displacement
      if (s4Title) gsap.set(s4Title, { opacity: 0, y: yShift });
      if (s4Subtitle) gsap.set(s4Subtitle, { opacity: 0, y: yShiftSmall });
      if (s4EnvelopeRef.current) gsap.set(s4EnvelopeRef.current, { opacity: 0, y: yShiftCard, scale: 0.95 });
      if (s4SealRef.current) gsap.set(s4SealRef.current, { opacity: 0, scale: 0.75 });
      if (s4TextRef.current) gsap.set(s4TextRef.current, { opacity: 0, y: 12 });
      if (s4CtaRef.current) gsap.set(s4CtaRef.current, { opacity: 0, y: 14 });

      s4Tl = gsap.timeline({
        paused: true,
      });

      // Step 1: Tiêu đề chính xuất hiện trước
      if (s4Title) {
        s4Tl.to(
          s4Title,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          0
        );
      }

      // Step 2: Tiêu đề phụ xuất hiện sau (độ trễ 180ms)
      if (s4Subtitle) {
        s4Tl.to(
          s4Subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.18
        );
      }

      // Step 3: Khung thư kính mờ xuất hiện
      if (s4EnvelopeRef.current) {
        s4Tl.to(
          s4EnvelopeRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.58,
            ease: "power2.out",
          },
          0.36
        );
      }

      // Step 4: Con dấu sáp phát sáng (Wax seal) xuất hiện bên trong (độ trễ 180ms)
      if (s4SealRef.current) {
        s4Tl.to(
          s4SealRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: "back.out(1.6)",
          },
          0.54
        );
      }

      // Step 5: Câu chữ mặt trước bức thư xuất hiện (độ trễ 140ms)
      if (s4TextRef.current) {
        s4Tl.to(
          s4TextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.68
        );
      }

      // Step 6: Nút bấm CTA "Chạm để mở bức thư" xuất hiện sau cùng (độ trễ 160ms)
      if (s4CtaRef.current) {
        s4Tl.to(
          s4CtaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.52,
            ease: "power2.out",
          },
          0.84
        );
      }

      ScrollTrigger.create({
        trigger: section04Ref.current,
        start: "top 78%",
        end: "bottom 18%",
        toggleActions: "play reverse play reverse",
        animation: s4Tl,
      });
    }

    // 6. Canvas image sequence handling (300 frames)
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const loadedStatus: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let currentTargetFrame = 0;
    let lastRenderedFrame = -1;

    const drawCoverImage = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const ox = (cw - nw) * 0.5;
      const oy = (ch - nh) * 0.5;

      ctx.drawImage(img, 0, 0, iw, ih, ox, oy, nw, nh);
    };

    const renderFrame = (index: number) => {
      currentTargetFrame = index;

      let targetImg: HTMLImageElement | null = null;
      if (images[index] && loadedStatus[index]) {
        targetImg = images[index];
      } else {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = index - offset;
          if (prev >= 0 && images[prev] && loadedStatus[prev]) {
            targetImg = images[prev];
            break;
          }
          const next = index + offset;
          if (next < TOTAL_FRAMES && images[next] && loadedStatus[next]) {
            targetImg = images[next];
            break;
          }
        }
      }

      if (targetImg) {
        drawCoverImage(targetImg);
        lastRenderedFrame = index;
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      if (lastRenderedFrame >= 0) {
        renderFrame(currentTargetFrame);
      }
      ScrollTrigger.refresh();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Load initial frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      loadedStatus[0] = true;
      if (lastRenderedFrame === -1) {
        renderFrame(0);
      }
    };

    // Sequential preload for remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;
      img.onload = () => {
        loadedStatus[i] = true;
        if (Math.abs(currentTargetFrame - i) <= 1) {
          renderFrame(currentTargetFrame);
        }
      };
    }

    // GSAP ScrollTrigger synchronization for entire page scroll with smooth 0.8s scrub
    const playhead = { frame: 0 };

    const scrollAnim = gsap.to(playhead, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: () => {
          const target = Math.round(playhead.frame);
          if (target !== lastRenderedFrame) {
            renderFrame(target);
          }
        },
      },
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      s2Tl?.kill();
      s3Tl?.kill();
      s4Tl?.kill();
      scrollAnim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleCtaScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo("#section-02", {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const sec02 = document.getElementById("section-02");
      if (sec02) {
        sec02.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: "600vh" }}
    >
      {/* ======================================================== */}
      {/* 1. FIXED BACKGROUND CANVAS — 300 FRAMES SCROLL ANIMATION */}
      {/* ======================================================== */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          style={{
            filter: "saturate(1.15) contrast(1.03) brightness(1.02)",
          }}
        />

        {/* Vibrant Floral Color Grading Layer — enhances life & warmth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 90, 150, 0.14) 0%, rgba(255, 170, 190, 0.16) 35%, rgba(255, 210, 160, 0.14) 70%, rgba(210, 80, 160, 0.16) 100%)",
            mixBlendMode: "color",
          }}
        />

        {/* Ethereal Luminous Warm Bloom & Depth Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 32%, rgba(255, 235, 248, 0.24) 0%, rgba(255, 180, 215, 0.14) 48%, rgba(60, 10, 35, 0.16) 100%)",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Ambient Warm Sunbeam Radiance Highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 55% 22%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 220, 235, 0.1) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. SCROLLABLE CONTENT LAYER OVER CANVAS                  */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full">
        {/* ======================================================== */}
        {/* SECTION 01: HERO — 2 LINES TITLE & FIT 100VH WITH CTA    */}
        {/* ======================================================== */}
        <section
          id="section-hero"
          className="w-full h-screen max-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-4 text-center select-none overflow-hidden"
        >
          <div
            ref={heroContentRef}
            className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto"
          >
            {/* Small Date & Occasion Label */}
            <div
              ref={heroLabelRef}
              style={{
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 15px rgba(220, 140, 175, 0.2)",
                color: "#7A1E4B",
              }}
              className="inline-block text-[10px] sm:text-xs font-vietnam font-semibold tracking-[0.24em] uppercase mb-1 sm:mb-1.5 px-3.5 py-1 rounded-full"
            >
              20.10 · VIETNAMESE WOMEN'S DAY
            </div>

            {/* Main Title: EXACTLY 2 LINES with increased size */}
            <h1 className="flex flex-col items-center font-handwritten font-bold tracking-normal my-0.5 sm:my-1">
              <span
                ref={heroTitleL1Ref}
                className="block whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-[#FFF8FC] leading-[1.06] drop-shadow-[0_4px_20px_rgba(60,10,35,0.75)]"
              >
                A Little Dream
              </span>
              <span
                ref={heroTitleL2Ref}
                className="block whitespace-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#FFD6E5] leading-[1.06] drop-shadow-[0_4px_20px_rgba(60,10,35,0.75)] -mt-1 sm:-mt-2"
              >
                for Her
              </span>
            </h1>

            {/* Frosted Gaussian Blur Pod under Subtitle, Description & Conclusion */}
            <div
              ref={heroPodRef}
              style={{
                background: "rgba(255, 248, 252, 0.78)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 12px 30px rgba(180, 50, 100, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1)",
                borderRadius: "1.25rem",
              }}
              className="w-full max-w-lg mx-auto mt-2 sm:mt-2.5 px-5 py-3 sm:px-6 sm:py-3.5 flex flex-col items-center text-center transition-all duration-300"
            >
              {/* Subtitle */}
              <p
                style={{ color: "#360C20" }}
                className="text-sm sm:text-base md:text-lg font-vietnam font-bold leading-snug tracking-tight"
              >
                Một ngày dịu dàng dành riêng cho bạn.
              </p>

              {/* Description */}
              <p
                style={{ color: "#541A38" }}
                className="text-[11px] sm:text-xs md:text-sm font-vietnam font-normal leading-relaxed mt-1.5 sm:mt-2"
              >
                Gửi đến những người phụ nữ tuyệt vời — những bông hoa mang vẻ đẹp rất riêng, những trái tim luôn biết yêu thương, và những tâm hồn khiến thế giới này trở nên ấm áp hơn.
              </p>

              {/* Short Conclusion */}
              <p
                style={{ color: "#360C20" }}
                className="text-[11px] sm:text-xs md:text-sm font-vietnam font-semibold italic mt-1.5 sm:mt-2"
              >
                Hôm nay, hãy để mọi dịu dàng thuộc về bạn.
              </p>
            </div>

            {/* CTA Button — Sitting comfortably in the same 100vh frame */}
            <button
              ref={heroCtaRef}
              onClick={handleCtaScroll}
              style={{
                background:
                  "linear-gradient(135deg, #F4AFCB 0%, #FFF8FC 50%, #F8C8DC 100%)",
                color: "#3D0E25",
                border: "1px solid rgba(255, 255, 255, 0.9)",
              }}
              className="cta-glow group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 mt-3 sm:mt-3.5 rounded-full font-vietnam font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-[0_6px_20px_rgba(244,175,203,0.55)] hover:shadow-[0_8px_30px_rgba(244,175,203,0.8)]"
            >
              <span>Lướt - để bước vào vườn yêu thương</span>
              <svg
                className="w-3.5 h-3.5 translate-y-[1px] transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.4}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Spacer between Hero and Section 02 (aligns Section 02 precisely with Frame 110 Astronaut) */}
        <div className="w-full h-[84vh] pointer-events-none" />

        {/* ======================================================== */}
        {/* SECTION 02: 4 CARDS IN 1 HORIZONTAL ROW                  */}
        {/* ======================================================== */}
        <section
          id="section-02"
          ref={section02Ref}
          className="w-full min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center select-none"
        >
          <div
            ref={s2ContentWrapperRef}
            className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Section 02 Header: Fades in from top to bottom */}
            <div
              ref={s2HeaderRef}
              className="max-w-2xl mx-auto text-center mb-6 sm:mb-8 will-change-[opacity,transform]"
            >
              {/* English Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-handwritten font-bold text-[#FFF8FC] leading-tight drop-shadow-[0_3px_14px_rgba(65,15,38,0.7)]">
                You Are Made of Beautiful Things
              </h2>

              {/* Vietnamese Subtitle */}
              <p
                style={{
                  color: "#4A1830",
                  textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)",
                }}
                className="text-xs sm:text-sm md:text-base font-vietnam font-bold mt-1 sm:mt-1.5 tracking-wide"
              >
                Những điều tuyệt đẹp tạo nên bạn
              </p>
            </div>

            {/* 4 Cards in 1 SINGLE HORIZONTAL ROW: Staggered from left to right */}
            <div
              ref={s2CardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full"
            >
              {SECTION_02_CARDS.map((card, idx) => (
                <div
                  key={card.id}
                  style={{
                    background: "rgba(255, 247, 251, 0.55)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    borderRadius: "18px",
                    boxShadow:
                      "0 6px 24px rgba(111, 65, 91, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  }}
                  className={`glass-card s2-card-${idx} group flex flex-col overflow-hidden will-change-[opacity,transform]`}
                >
                  {/* Scaled down Flower Image (aspect 16/10) */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-t-[17px] relative">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Card Text Content */}
                  <div className="p-3.5 sm:p-4 md:p-4.5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Theme Title */}
                      <h3 className="text-xs sm:text-sm md:text-base font-vietnam font-bold text-[#65485B] tracking-tight line-clamp-1">
                        {card.title}
                      </h3>

                      {/* Vietnamese Description */}
                      <p className="text-[11px] sm:text-xs font-vietnam font-normal text-[#65485B]/90 leading-snug mt-1.5 sm:mt-2">
                        {card.desc}
                      </p>
                    </div>

                    {/* Short Quote */}
                    <p className="text-[10px] sm:text-[11px] font-vietnam italic font-medium text-[#806C7B] mt-2.5 sm:mt-3 pt-2 border-t border-white/50">
                      {card.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacer between Section 02 and Section 03 (aligns Section 03 precisely with ezgif-frame-190.png) */}
        <div className="w-full h-[32vh] pointer-events-none" />

        {/* ======================================================== */}
        {/* SECTION 03: 6 EXPANDABLE LITTLE REMINDERS CARDS          */}
        {/* Syncs with ezgif-frame-190.png (Cosmos flower vortex)     */}
        {/* ======================================================== */}
        <section
          id="section-03"
          ref={section03Ref}
          className="w-full min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center select-none"
        >
          <div
            ref={s3ContentWrapperRef}
            className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Section 03 Header */}
            <div
              ref={s3HeaderRef}
              className="w-full max-w-3xl mx-auto text-center mb-6 sm:mb-8 will-change-[opacity,transform]"
            >
              {/* English Main Title — strictly on 1 single line */}
              <h2 className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-handwritten font-bold text-[#FFF8FC] leading-tight drop-shadow-[0_3px_14px_rgba(65,15,38,0.7)]">
                Little Reminders for You
              </h2>

              {/* Vietnamese Subtitle */}
              <p
                style={{
                  color: "#4A1830",
                  textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)",
                }}
                className="text-xs sm:text-sm md:text-base font-vietnam font-bold mt-1 sm:mt-1.5 tracking-wide"
              >
                Những lời nhắn bạn nên được nghe nhiều hơn
              </p>
            </div>

            {/* 6 Expandable Cards in 2 columns x 3 rows */}
            <div
              ref={s3CardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full"
            >
              {SECTION_03_REMINDERS.map((card) => {
                const isExpanded = activeCardId === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: card.bg,
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      border: `1px solid ${card.border}`,
                      borderRadius: "20px",
                      boxShadow: isExpanded
                        ? `0 12px 32px ${card.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`
                        : `0 6px 20px rgba(111, 65, 91, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
                    }}
                    className={`reminder-card group relative p-4.5 sm:p-5 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] ${
                      isExpanded ? "ring-2 ring-white/60" : ""
                    }`}
                  >
                    {/* Header Row: Tag & Expand Action */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        style={{ color: card.tagColor }}
                        className="text-[10px] sm:text-xs font-vietnam font-bold tracking-[0.18em] uppercase"
                      >
                        {card.tag}
                      </span>

                      {/* Expand / Collapse Indicator Button */}
                      <div
                        style={{
                          background: isExpanded ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.65)",
                          color: card.titleColor,
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-vietnam font-semibold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm"
                      >
                        <span>{isExpanded ? "Thu gọn" : "Chạm để xem"}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3
                      style={{ color: card.titleColor }}
                      className="text-base sm:text-lg md:text-xl font-vietnam font-bold mt-2 tracking-tight transition-colors"
                    >
                      {card.title}
                    </h3>

                    {/* Expandable Content Area */}
                    <div
                      className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 mt-2.5 pt-2.5 border-t border-black/5"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          style={{ color: card.descColor }}
                          className="text-xs sm:text-sm font-vietnam font-normal leading-relaxed"
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Spacer between Section 03 and Section 04 (aligns Section 04 precisely with ezgif-frame-280.png) */}
        <div className="w-full h-[50vh] pointer-events-none" />

        {/* ======================================================== */}
        {/* SECTION 04: THE CONDENSED LETTER (CLOSING HEARTFELT NOTE)*/}
        {/* Syncs with ezgif-frame-280.png (Grand Flower Bouquet)     */}
        {/* ======================================================== */}
        <section
          id="section-04"
          ref={section04Ref}
          className="w-full min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center select-none"
        >
          <div
            ref={s4ContentWrapperRef}
            className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center"
          >
            {/* Section 04 Header */}
            <div
              ref={s4HeaderRef}
              className="max-w-xl mx-auto text-center mb-8 will-change-[opacity,transform]"
            >

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-handwritten font-bold text-[#FFF8FC] leading-tight drop-shadow-[0_3px_14px_rgba(65,15,38,0.7)]">
                A Letter for Her
              </h2>

              <p
                style={{
                  color: "#4A1830",
                  textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)",
                }}
                className="text-xs sm:text-sm md:text-base font-vietnam font-bold mt-1 tracking-wide"
              >
                Có một phong thư gửi riêng cho bạn, hãy mở ra khi bạn đã sẵn sàng
              </p>
            </div>

            {/* Closed Envelope Interactive Component — Modern Frosted Glass Material */}
            <div
              ref={s4EnvelopeRef}
              onClick={() => setIsLetterOpen(true)}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.14) 50%, rgba(255, 240, 248, 0.24) 100%)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.65)",
                borderRadius: "36px",
                boxShadow:
                  "0 30px 60px -15px rgba(55, 12, 32, 0.22), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.05), inset 0 0 25px rgba(255, 255, 255, 0.15)",
              }}
              className="group relative w-full max-w-md p-7 sm:p-9 cursor-pointer transition-all duration-400 ease-out hover:scale-[1.03] hover:shadow-[0_32px_70px_rgba(200,70,120,0.3)] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Frosted Glass Fine Grain Noise Texture */}
              <div
                className="absolute inset-0 rounded-[36px] pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Top Specular Edge Highlight */}
              <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent pointer-events-none" />

              {/* Glowing Wax Seal Button in Center */}
              <div ref={s4SealRef} className="relative my-2 sm:my-3 z-10 will-change-[opacity,transform]">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[0_10px_28px_rgba(180,50,90,0.35)] transition-transform duration-400 group-hover:scale-110"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #FFB6D3 0%, #D85282 60%, #9E2D57 100%)",
                    border: "2px solid rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 10px 28px rgba(180, 50, 90, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <span className="text-2xl sm:text-3xl text-white drop-shadow select-none">
                    💌
                  </span>
                </div>
                {/* Gentle Pulsing Ring around Wax Seal */}
                <div className="absolute -inset-2 rounded-full border border-pink-300/60 animate-ping pointer-events-none opacity-40" />
              </div>

              {/* Envelope Front Typography */}
              <div ref={s4TextRef} className="mt-3 relative z-10 will-change-[opacity,transform]">
                <p
                  style={{
                    color: "#3D0C22",
                    textShadow: "0 1px 12px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(255, 255, 255, 0.7)",
                  }}
                  className="font-handwritten-vn text-3xl sm:text-4xl font-bold tracking-wide"
                >
                  Gửi người phụ nữ tuyệt vời
                </p>
                <p
                  style={{
                    color: "#5E1837",
                    textShadow: "0 1px 8px rgba(255, 255, 255, 0.75)",
                  }}
                  className="font-vietnam text-xs sm:text-sm font-semibold mt-1"
                >
                  Chứa đựng những điều dịu dàng nhất dành tặng bạn
                </p>
              </div>

              {/* CTA Action Pill — Frosted Glass Style */}
              <div
                ref={s4CtaRef}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 232, 243, 0.6) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  color: "#4A0E28",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  boxShadow:
                    "0 8px 24px rgba(150, 35, 75, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                }}
                className="mt-5 relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-vietnam font-bold tracking-wide transition-all duration-300 group-hover:shadow-[0_12px_28px_rgba(180,50,90,0.25)] group-hover:scale-105 will-change-[opacity,transform]"
              >
                <span>Chạm để mở bức thư</span>
                <span className="text-base group-hover:translate-x-0.5 transition-transform">✨</span>
              </div>
            </div>
          </div>
        </section>

        {/* Runway after Section 04 for final celebration frames */}
        <div className="w-full h-[65vh] pointer-events-none" />

        {/* ======================================================== */}
        {/* FULLSCREEN BLURRED BACKDROP & OPENED LETTER READING MODAL*/}
        {/* ======================================================== */}
        {isLetterOpen && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-500 animate-fadeIn"
            style={{
              background: "rgba(22, 6, 15, 0.65)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            onClick={() => setIsLetterOpen(false)}
          >
            {/* The Unfolded Stationery Paper */}
            <div
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl h-[86vh] max-h-[86vh] flex flex-col rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.45)] border border-white/90 animate-scaleUp select-text"
              style={{
                background: "linear-gradient(180deg, #FFFDFE 0%, #FFF5F9 50%, #FFEFF5 100%)",
              }}
            >
              {/* Top Decorative Header with Close Button */}
              <div className="flex-shrink-0 px-6 py-4 sm:px-8 sm:py-5 border-b border-pink-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌸</span>
                  <span
                    style={{ color: "#7A2049" }}
                    className="text-[11px] sm:text-xs font-vietnam font-bold tracking-[0.2em] uppercase"
                  >
                    THƯ GỬI NGÀY PHỤ NỮ VIỆT NAM 20.10
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsLetterOpen(false)}
                  style={{
                    background: "rgba(244, 175, 203, 0.25)",
                    color: "#5C1434",
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-vietnam font-bold transition-all hover:bg-pink-200/60 cursor-pointer shadow-sm active:scale-95"
                >
                  <span>Đóng thư</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Letter Content */}
              <div
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-9 custom-letter-scrollbar font-vietnam"
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
              >
                {/* Salutation / Title */}
                <h3
                  style={{ color: "#4A102B" }}
                  className="font-handwritten-vn text-2xl sm:text-3xl md:text-[32px] font-bold leading-snug mb-5"
                >
                  <span className="block sm:inline">Gửi bạn, </span>
                  <span className="inline-block">một người phụ nữ tuyệt vời ♡</span>
                </h3>

                {/* Paragraphs */}
                <div
                  style={{ color: "#3B1124" }}
                  className="space-y-4 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal"
                >
                  <p>
                    Nhân ngày Phụ nữ Việt Nam 20/10, chúc bạn có một ngày thật nhiều niềm vui, nhận được những lời chúc chân thành và cảm nhận được rằng mình luôn là một người đặc biệt theo cách rất riêng.
                  </p>

                  <p>
                    Mong bạn sẽ luôn giữ được ánh sáng của riêng mình, dù cuộc sống đôi khi có những ngày chẳng được như ý. Mong bạn đủ tự tin để theo đuổi những điều mình yêu thích, đủ can đảm để bước qua những điều khiến mình lo lắng, và đủ dịu dàng với chính mình trong những lúc chưa thể làm tốt mọi thứ.
                  </p>

                  <p>
                    Chúc bạn luôn gặp được những người tử tế, những người sẵn lòng lắng nghe, thấu hiểu và trân trọng bạn bằng sự chân thành. Mong những cố gắng của bạn sẽ được đền đáp, những ước mơ bạn ấp ủ sẽ dần thành hiện thực, và những điều tốt đẹp dù nhỏ bé cũng luôn tìm được đường đến với bạn.
                  </p>

                  <p>
                    Và nếu có những ngày bạn cảm thấy mệt mỏi, chông chênh hay chưa hài lòng với chính mình, mong bạn nhớ rằng bạn không cần phải hoàn hảo mới xứng đáng với những điều tốt đẹp. Bạn có thể chậm lại, có thể nghỉ ngơi, có thể bắt đầu lại bất cứ khi nào mình muốn. Hành trình của mỗi người đều có nhịp điệu riêng, và hành trình của bạn cũng vậy.
                  </p>

                  <p>
                    <strong className="font-semibold text-[#4A102B]">
                      Mong bạn không chỉ rực rỡ trong hôm nay, mà còn hạnh phúc trong cả những ngày bình thường nhất.
                    </strong>{" "}
                    Có hoa để ngắm, có những người để sẻ chia, có những giấc mơ để mong chờ và có thật nhiều lý do để mỉm cười khi thức dậy mỗi sáng.
                  </p>

                  <p>
                    Chúc bạn luôn xinh đẹp theo cách khiến chính mình tự tin, mạnh mẽ theo cách khiến bản thân tự hào, và bình yên theo cách mà trái tim mình mong muốn.
                  </p>

                  <p>
                    Cảm ơn bạn vì đã là chính mình, vì những điều tốt đẹp bạn mang đến cho thế giới, dù đôi khi chính bạn cũng chẳng nhận ra.
                  </p>

                  <p className="pt-2">
                    <strong className="font-semibold text-[#4A102B]">
                      Chúc bạn một ngày 20/10 thật dịu dàng, và một cuộc đời có thật nhiều điều đáng để yêu thương. ♡
                    </strong>
                  </p>
                </div>

                {/* Closing Signature */}
                <div className="mt-8 pt-5 border-t border-pink-200/60 flex flex-col items-end text-right">
                  <p
                    style={{ color: "#7A2049" }}
                    className="font-handwritten-vn text-xl sm:text-2xl font-semibold"
                  >
                    With love and the warmest wishes,
                  </p>
                  <p
                    style={{ color: "#541233" }}
                    className="font-vietnam text-xs sm:text-sm italic font-medium mt-1 text-pink-900/80"
                  >
                    Dành tặng bạn — hôm nay và cả những ngày sau nữa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
