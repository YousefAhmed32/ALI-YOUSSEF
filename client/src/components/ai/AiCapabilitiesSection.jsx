import { capabilitiesComparison, aiStudioFaq } from '../../data/aiStudio.js';

export function AiCapabilitiesSection() {
  return (
    <section id="capabilities" className="ai-section">
      <div className="ai-section__header">
        <div className="ai-section__eyebrow">
          <span className="ai-section__eyebrow-line" />
          <span>CHAPTER 04 // COMMERCIAL SPECIFICATIONS</span>
        </div>
        <h2 className="ai-section__title">
          WHY BRANDS COMMISSION <span className="ai-section__title-serif">Synthetic Production</span>
        </h2>
        <p className="ai-section__desc">
          Compare the realities of traditional high-budget commercial sets against our computational generative workflow.
          Radical velocity without sacrificing luxury editorial purity.
        </p>
      </div>

      <div className="ai-comparison-card" style={{ marginBottom: '60px' }}>
        <table className="ai-comparison-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>DIMENSION</th>
              <th style={{ width: '37%' }}>TRADITIONAL COMMERCIAL SET</th>
              <th className="col-studio" style={{ width: '38%' }}>
                ALI YOUSSEF AI STUDIO ✦
              </th>
            </tr>
          </thead>
          <tbody>
            {capabilitiesComparison.map((row) => (
              <tr key={row.metric}>
                <td className="col-metric">{row.metric}</td>
                <td>{row.traditional}</td>
                <td className="col-studio">{row.aiStudio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Grid */}
      <div style={{ marginTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--ai-font-sans)', fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>
          FREQUENTLY ADDRESSED COMMERCIAL QUESTIONS
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {aiStudioFaq.map((faq) => (
            <div
              key={faq.q}
              style={{
                background: 'var(--ai-bg-card)',
                border: '1px solid var(--ai-border)',
                borderRadius: 'var(--ai-radius-md)',
                padding: '24px',
              }}
            >
              <h4 style={{ fontFamily: 'var(--ai-font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--ai-gold)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                {faq.q}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ai-text-secondary)', margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
