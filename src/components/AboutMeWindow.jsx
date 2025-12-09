import React from "react";
import "./Window.css"; // reuse your shared Aqua window styles

/**
 * AboutMeWindow
 * Props:
 *  - onClose: function called when the red traffic light is clicked
 */
export default function AboutMeWindow({ onClose }) {
  return (
    // Root element: we opt-in to bigger & resizable behavior by adding
    // the modifier classes `window--app` and `resizable`.
    // Keep `window` so we get the shared Aqua chrome (pinstripes, etc.).
    <div className="window window--app resizable">
      
      {/* Titlebar (pinstripes, traffic lights, centered title) */}
      <div className="window-header">
        {/* Left-side traffic lights */}
        <div className="window-buttons">
          {/* Close: calls the onClose prop passed from Desktop.jsx */}
          <button className="window-button red" onClick={onClose} />
          {/* In Puma these exist but we’re not wiring them yet */}
          <button className="window-button clear" />
          <button className="window-button clear" />
        </div>

        {/* Centered title text (CSS centers it absolutely) */}
        <div className="window-title">About Me</div>
      </div>

      {/* Optional “toolbar” row (Finder-style) — uncomment to use
      <div className="window-toolbar">…buttons/segments later…</div>
      and add 'with-toolbar' to the root className to adjust height
      */}
      
      {/* Scrollable content area (thanks to .window-content overflow: auto) */}
      <div className="window-content">
        {/* You can replace this with your real content later */}
        <section style={{ maxWidth: 680, margin: "0 auto", textAlign: "left" }}>
          <h3 style={{ marginTop: 0 }}>Stein McGale</h3>
          <p>
            Systems & Data specialist building an authentic Mac OS X Puma–style portfolio.
            This window is a reusable shell: same chrome, larger size, scrollable, and resizable.
          </p>

          <h4>Focus areas</h4>
          <ul>
            <li>Data dashboards (Excel, Power BI) and intranet analytics</li>
            <li>AI adoption & prompt design for teams</li>
            <li>Web3 experiments (Sui/Move), finance UI prototypes</li>
          </ul>

          <h4>Links</h4>
          <ul>
            <li><a href="mailto:you@example.com">Email</a></li>
            <li><a href="https://github.com/your-handle" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/stein-mcgale/" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>

          {/* Add enough content to prove scrolling works */}
          <p style={{ opacity: 0.7 }}>
            Scroll to confirm content overflow works. Resize using the native handle
            (bottom-right) because we added the `resizable` class.
          </p>
        </section>
      </div>

      {/* Visual growbox hint to match early OS X (purely decorative) */}
      <div className="window-growbox" aria-hidden />
    </div>
  );
}

