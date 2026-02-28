import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface Edge {
  from: number;
  to: number;
}

interface Parcel {
  edge: number;
  progress: number;
  speed: number;
  forward: boolean;
}

const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Generate nodes
    const nodeCount = 18;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: 0.1 + Math.random() * 0.8,
        y: 0.1 + Math.random() * 0.8,
        radius: 2 + Math.random() * 3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Generate edges (connect nearby nodes)
    const edges: Edge[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        distances.push({ idx: j, dist: Math.sqrt(dx * dx + dy * dy) });
      }
      distances.sort((a, b) => a.dist - b.dist);
      const connectCount = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < connectCount; k++) {
        const edge = { from: Math.min(i, distances[k].idx), to: Math.max(i, distances[k].idx) };
        if (!edges.some((e) => e.from === edge.from && e.to === edge.to)) {
          edges.push(edge);
        }
      }
    }

    // Parcels (traveling orange dots)
    const parcels: Parcel[] = [];
    for (let i = 0; i < 6; i++) {
      parcels.push({
        edge: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
        forward: Math.random() > 0.5,
      });
    }

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // Draw edges
      edges.forEach((edge) => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(from.x * cw, from.y * ch);
        ctx.lineTo(to.x * cw, to.y * ch);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const scale = 1 + Math.sin(node.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x * cw, node.y * ch, node.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();
      });

      // Draw parcels
      parcels.forEach((parcel) => {
        const edge = edges[parcel.edge];
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        const t = parcel.forward ? parcel.progress : 1 - parcel.progress;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;

        // Glow
        const gradient = ctx.createRadialGradient(x * cw, y * ch, 0, x * cw, y * ch, 12);
        gradient.addColorStop(0, "rgba(232, 80, 10, 0.6)");
        gradient.addColorStop(1, "rgba(232, 80, 10, 0)");
        ctx.beginPath();
        ctx.arc(x * cw, y * ch, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x * cw, y * ch, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#E8500A";
        ctx.fill();

        parcel.progress += parcel.speed;
        if (parcel.progress > 1) {
          parcel.progress = 0;
          parcel.edge = Math.floor(Math.random() * edges.length);
          parcel.forward = Math.random() > 0.5;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

export default NetworkAnimation;
