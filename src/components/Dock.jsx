import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Dock.css";


import finderIcon from "../Images/Finder.png";
import mailIcon from "../Images/Mail.png";
import itunesIcon from "../Images/Itunes.png";
import quicktimeIcon from "../Images/quicktime.png";
import trashEmptyIcon from "../Images/user-trash.png";

const ITEMS_LEFT = [
  { id: "finder",    title: "Finder",    src: finderIcon,     kind: "finder" },
  { id: "mail",      title: "Mail",      src: mailIcon,       kind: "mail" },
  { id: "itunes",    title: "iTunes",    src: itunesIcon,     kind: "itunes" },
  { id: "quicktime", title: "QuickTime", src: quicktimeIcon,  kind: "quicktime" },
];

const ITEMS_RIGHT = [
  { id: "trash", title: "Trash", src: trashEmptyIcon, kind: "trash" },
];

export default function Dock({
  itemsLeft = ITEMS_LEFT,
  itemsRight = ITEMS_RIGHT,
  onOpenWindow,                                     // (type, title)
  onMail = () => { window.location.href = "mailto:yourname@example.com"; },
  onItunes = () => {},
  onQuickTime = () => {},
  onTrashDrop = (id) => { console.log("Dropped on trash:", id); },

  // Magnification tuning (authentic Puma-like feel)
  magnify = { base: 48, max: 100, sigma: 70, smooth: 0.22 },
}) {
  const dockRef = useRef(null);
  const [pointerX, setPointerX] = useState(null);
  const targetX = useRef(null);
  const animX = useRef(null);
  const rafId = useRef(null);
  const [trashArmed, setTrashArmed] = useState(false);

  const BASE = magnify.base;
  const MAX = magnify.max;
  const SIGMA = magnify.sigma;
  const SMOOTH = magnify.smooth;
  const maxScale = MAX / BASE;

  // Pointer → local X
  const onMove = useCallback((e) => {
    const el = dockRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    targetX.current = e.clientX - r.left;
    if (pointerX === null) setPointerX(targetX.current);
  }, [pointerX]);

  const onLeave = () => {
    targetX.current = null;
    setPointerX(null);
  };

  // RAF smoothing for silky scaling
  useEffect(() => {
    const step = () => {
      if (targetX.current == null) {
        animX.current = null;
      } else {
        if (animX.current == null) animX.current = targetX.current;
        const dx = targetX.current - animX.current;
        animX.current += dx * SMOOTH;
      }
      setPointerX(animX.current);
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, [SMOOTH]);

  // Distance → scale (Gaussian bump)
  const scaleFor = (dist) => {
    if (pointerX == null) return 1;
    const s = 1 + (maxScale - 1) * Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
    return Math.max(1, Math.min(maxScale, s));
  };

  // Icon click actions
  const handleClick = (kind) => {
    switch (kind) {
      case "finder":
        onOpenWindow?.("about", "About This Mac"); // placeholder for now
        break;
      case "mail":
        onMail();
        break;
      case "itunes":
        onItunes();
        break;
      case "quicktime":
        onQuickTime();
        break;
      default:
        break;
    }
  };

  // Trash DnD handlers
  const handleTrashDragOver = (e) => { e.preventDefault(); setTrashArmed(true); };
  const handleTrashDragLeave = () => setTrashArmed(false);
  const handleTrashDrop = (e) => {
    e.preventDefault();
    setTrashArmed(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onTrashDrop(id);
  };

  return (
    <div
      className="dock"
      ref={dockRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Shelf is the background of this fixed-size box (width set in CSS) */}
      <div className="dock-zones">
        <ul className="dock-strip dock-left">
          {itemsLeft.map((item) => (
            <DockItem
              key={item.id}
              item={item}
              base={BASE}
              pointerX={pointerX}
              scaleFor={scaleFor}
              onClick={() => handleClick(item.kind)}
            />
          ))}
        </ul>

        <div className="dock-sep" aria-hidden />

        <ul
          className="dock-strip dock-right"
          onDragOver={handleTrashDragOver}
          onDragLeave={handleTrashDragLeave}
          onDrop={handleTrashDrop}
        >
          {itemsRight.map((item) => (
            <DockItem
              key={item.id}
              item={item}
              base={BASE}
              pointerX={pointerX}
              scaleFor={scaleFor}
              onClick={() => {}}
              trashArmed={trashArmed}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// size-based magnification)

function DockItem({ item, base, pointerX, scaleFor, onClick, trashArmed = false }) {
  const ref = useRef(null);
  const [center, setCenter] = useState(0);

  // Measure own center so magnification follows the pointer
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setCenter(r.left + r.width / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const dist  = pointerX == null ? Infinity : Math.abs(center - pointerX);
  const scale = scaleFor(dist);
  const size  = Math.round(base * scale); // actual width/height grows

  return (
    <li
      ref={ref}
      className={`dock-item ${trashArmed ? "trash-armed" : ""}`}
      style={{ width: size }}
    >
      <div
        className="dock-icon-wrap"
        style={{ width: size, height: size }}
        title={item.title}
        onClick={onClick}
      >
        <img
          className="dock-icon"
          src={item.src}
          alt={item.title}
          draggable="false"
          style={{ width: size, height: size }}
        />
        <img
          className="dock-icon dock-reflection"
          src={item.src}
          alt=""
          aria-hidden="true"
          style={{ width: size, height: size }}
        />
      </div>
      <div className="dock-label">{item.title}</div>
    </li>
  );
}