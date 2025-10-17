import React from 'react';
import { OntologyConcepts } from '../ontology/centralSchema';
import { HospitalSystemMappings, TerminologyCrosswalks } from '../ontology/hospitalMappings';

export function OntologyResolver() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>
          🧠 Ontology Resolution Engine
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Semantic Field Matching</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            <div style={{ fontWeight: 'bold' }}>Source Concept</div>
            <div style={{ fontWeight: 'bold' }}>Ontology Concept</div>
            <div style={{ fontWeight: 'bold' }}>Target Field</div>
            
            {Object.entries(HospitalSystemMappings.legacy_ehr_v1.fieldMappings)
              .map(([source, mapping]) => (
              <React.Fragment key={source}>
                <div>"{source}"</div>
                <div style={{ color: '#1e40af' }}>{mapping.ontology}</div>
                <div>{mapping.target}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Value Transformation Preview</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold' }}>Source Values</div>
              <div>EMER</div>
              <div>M</div>
              <div>AMB</div>
            </div>
            
            <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>→ Ontology Mapping →</div>
            </div>
            
            <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold' }}>Standardized Output</div>
              <div>Emergency</div>
              <div>Male</div>
              <div>Ambulatory</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Data Quality Validation Rules</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {[
              { rule: 'Required Field Check', status: 'pass', color: 'green' },
              { rule: 'Date Format Validation', status: 'pass', color: 'green' },
              { rule: 'Code System Compliance', status: 'warning', color: 'orange' },
              { rule: 'Value Range Check', status: 'pass', color: 'green' },
              { rule: 'Cross-reference Validation', status: 'fail', color: 'red' },
              { rule: 'Data Type Consistency', status: 'pass', color: 'green' }
            ].map(validation => (
              <div key={validation.rule} style={{
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '4px',
                border: `2px solid ${validation.color}`,
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 'bold' }}>{validation.rule}</div>
                <div style={{ 
                  color: validation.color,
                  fontWeight: 'bold',
                  marginTop: '0.5rem'
                }}>
                  {validation.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Ontology Concept Browser</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {Object.entries(OntologyConcepts).map(([concept, details]) => (
              <div key={concept} style={{
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontWeight: 'bold', color: '#1e40af' }}>{concept}</div>
                <div style={{ fontSize: '0.9rem' }}>Domain: {details.domain}</div>
                <div style={{ fontSize: '0.9rem' }}>Concept: {details.concept}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}