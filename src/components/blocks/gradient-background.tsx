"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create gradient blobs with theme-dependent colors - using calmer, softer colors
    const getBlobs = (isDarkMode: boolean) => [
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.3,
        radius: 400,
        color: isDarkMode
          ? "rgba(124, 58, 237, 0.15)" // Softer purple
          : "rgba(167, 139, 250, 0.2)", // Light purple - slightly more visible
        vx: 0.12, // Slower movement
        vy: 0.08,
        phase: 0,
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.6,
        radius: 350,
        color: isDarkMode
          ? "rgba(79, 70, 229, 0.12)" // Softer indigo
          : "rgba(99, 102, 241, 0.18)", // Light indigo - slightly more visible
        vx: -0.1, // Slower movement
        vy: 0.15,
        phase: 2,
      },
      {
        x: canvas.width * 0.3,
        y: canvas.height * 0.7,
        radius: 380,
        color: isDarkMode
          ? "rgba(219, 39, 119, 0.1)" // Softer pink
          : "rgba(236, 72, 153, 0.15)", // Light pink - slightly more visible
        vx: 0.14, // Slower movement
        vy: -0.09,
        phase: 4,
      },
    ];

    let blobs = getBlobs(isDark);
    let animationId: number;

    const drawBlob = (x: number, y: number, radius: number, color: string) => {
      ctx.beginPath();
      ctx.filter = "blur(120px)"; // Increased blur for softer edges
      ctx.fillStyle = color;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw theme-dependent background
      const bgColor = isDark
        ? "rgba(15, 23, 42, 0.95)" // Slightly transparent dark
        : "rgba(248, 250, 252, 0.95)"; // Slightly transparent light
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update blobs for current theme
      blobs = getBlobs(isDark);

      // Draw and move blobs
      blobs.forEach((blob) => {
        // Update phase for gentle pulsing effect
        blob.phase = (blob.phase + 0.005) % (Math.PI * 2); // Slower pulsing

        // Make radius pulse very slightly
        const pulsingRadius = blob.radius * (1 + 0.08 * Math.sin(blob.phase)); // Reduced pulsing

        // Update position with very slight wobble
        blob.x += blob.vx + Math.sin(blob.phase) * 0.1; // Reduced wobble
        blob.y += blob.vy + Math.cos(blob.phase) * 0.1;

        // Bounce off edges
        if (blob.x < -100 || blob.x > canvas.width + 100) blob.vx *= -1;
        if (blob.y < -100 || blob.y > canvas.height + 100) blob.vy *= -1;

        drawBlob(blob.x, blob.y, pulsingRadius, blob.color);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme, isDark]); // Re-run when theme changes

  return (
    <>
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundColor: isDark ? "rgb(15, 23, 42)" : "rgb(248, 250, 252)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: 1 }}
      />
    </>
  );
}
