import { useState } from 'react';
import { contact } from '../../data/contact.js';

export function AiInquireSection() {
  const [formData, setFormData] = useState({
    brandName: '',
    projectType: 'Commercial AI Video (15s–60s)',
    industry: 'Luxury Goods & Fragrance',
    timeline: 'Within 2 Weeks',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLaunchWhatsApp = (e) => {
    e.preventDefault();
    const { brandName, projectType, industry, timeline, notes } = formData;
    const msg = `Hello Ali, I would like to commission an AI Studio project.
Brand: ${brandName || 'Not specified'}
Project Type: ${projectType}
Industry: ${industry}
Timeline: ${timeline}
Notes: ${notes || 'Looking forward to reviewing options.'}`;

    const url = `https://wa.me/${contact.whatsapp.normalizedNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inquire" className="ai-section" style={{ paddingTop: '60px' }}>
      <div className="ai-inquire-box">
        <div className="ai-inquire-info">
          <div className="ai-section__eyebrow">
            <span className="ai-section__eyebrow-line" />
            <span>COMMISSION A SYNTHETIC CAMPAIGN</span>
          </div>

          <h3>Directing The Future of Your Brand Imagery.</h3>

          <p>
            We take on a limited volume of commercial video and product direction commissions each quarter to preserve
            extreme quality, custom model training rigor, and bespoke color craft.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '11px', color: 'var(--ai-text-muted)', display: 'block' }}>
                DIRECT WHATSAPP DESK
              </span>
              <span style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '16px', color: 'var(--ai-gold)' }}>
                {contact.whatsapp.displayNumber}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '11px', color: 'var(--ai-text-muted)', display: 'block' }}>
                STUDIO PRESENCE
              </span>
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Beirut &middot; Dubai &middot; Worldwide Remote
              </span>
            </div>
          </div>
        </div>

        <form className="ai-inquire-form" onSubmit={handleLaunchWhatsApp}>
          <div className="ai-inquire-field">
            <label htmlFor="brandName" className="ai-inquire-label">
              BRAND / COMPANY NAME
            </label>
            <input
              id="brandName"
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="e.g. Maison de Parfum, Apex Tech"
              className="ai-inquire-input"
              required
            />
          </div>

          <div className="ai-inquire-field">
            <label htmlFor="projectType" className="ai-inquire-label">
              DELIVERABLE SCOPE
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="ai-inquire-select"
            >
              <option value="Commercial AI Video (15s–60s)">Commercial AI Video (15s–60s)</option>
              <option value="Product Stills Suite (5–15 Key Visuals)">Product Stills Suite (5–15 Key Visuals)</option>
              <option value="Full Hybrid Campaign (Video + Stills + Social 9:16)">
                Full Hybrid Campaign (Video + Stills + Social 9:16)
              </option>
              <option value="Brand LoRA Training & AI Retainer">Brand LoRA Training &amp; AI Retainer</option>
            </select>
          </div>

          <div className="ai-inquire-field">
            <label htmlFor="industry" className="ai-inquire-label">
              INDUSTRY / SECTOR
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="ai-inquire-select"
            >
              <option value="Luxury Goods & Fragrance">Luxury Goods &amp; Fragrance</option>
              <option value="Horology & High Jewelry">Horology &amp; High Jewelry</option>
              <option value="Fashion & Haute Couture">Fashion &amp; Haute Couture</option>
              <option value="Architecture & Real Estate">Architecture &amp; Real Estate</option>
              <option value="Automotive & Industrial Tech">Automotive &amp; Industrial Tech</option>
              <option value="Botanicals & Skincare">Botanicals &amp; Skincare</option>
            </select>
          </div>

          <div className="ai-inquire-field">
            <label htmlFor="timeline" className="ai-inquire-label">
              REQUIRED DELIVERY TIMELINE
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="ai-inquire-select"
            >
              <option value="Immediate (Within 7 Days)">Immediate (Within 7 Days) — Rush</option>
              <option value="Within 2 Weeks">Within 2 Weeks — Standard</option>
              <option value="Next Month / Q2 Campaign">Next Month / Q2 Campaign</option>
            </select>
          </div>

          <div className="ai-inquire-field">
            <label htmlFor="notes" className="ai-inquire-label">
              CREATIVE VISION / NOTES (OPTIONAL)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about the mood, lighting, reference visuals, or specific product challenges..."
              className="ai-inquire-textarea"
            />
          </div>

          <button type="submit" className="ai-inquire-btn">
            <span>START CONVERSATION ON WHATSAPP</span>
            <span>↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
