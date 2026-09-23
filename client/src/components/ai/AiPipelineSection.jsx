import { aiPipelineSteps } from '../../data/aiStudio.js';

export function AiPipelineSection() {
  return (
    <section id="pipeline" className="ai-section">
      <div className="ai-section__header">
        <div className="ai-section__eyebrow">
          <span className="ai-section__eyebrow-line" />
          <span>CHAPTER 03 // THE DIRECTED PIPELINE</span>
        </div>
        <h2 className="ai-section__title">
          HOW WE DIRECT SYNTHETIC CINEMA <span className="ai-section__title-serif">(4 Stages)</span>
        </h2>
        <p className="ai-section__desc">
          Professional commercial AI production is not prompt gambling. It is a disciplined architectural pipeline combining
          custom LoRA checkpoints, ControlNet spatial anchors, optical camera physics, and DaVinci color mastery.
        </p>
      </div>

      <div className="ai-pipeline-grid">
        {aiPipelineSteps.map((step) => (
          <div key={step.step} className="ai-pipeline-card">
            <div className="ai-pipeline-card__step-num">{step.step}</div>
            <h3 className="ai-pipeline-card__phase">{step.phase}</h3>
            <p className="ai-pipeline-card__desc">{step.description}</p>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '10px', color: 'var(--ai-text-muted)', display: 'block', marginBottom: '4px' }}>
                DELIVERABLE:
              </span>
              <span style={{ fontSize: '12px', color: '#fff', fontWeight: 500 }}>
                {step.deliverable}
              </span>
            </div>

            <div className="ai-pipeline-card__footer">
              <span className="ai-pipeline-card__duration">{step.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
