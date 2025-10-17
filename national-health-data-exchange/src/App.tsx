import React, { useState } from 'react';
import { HospitalOnboarding } from './modules/HospitalOnboarding';
import { SchemaMapper } from './modules/SchemaMapper';
import { OntologyResolver } from './modules/OntologyResolver';
import { CentralDashboard } from './modules/CentralDashboard';

export default function App() {
  const [currentModule, setCurrentModule] = useState('onboarding');
  const [hospitals, setHospitals] = useState<any[]>([]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{
        background: '#1e40af',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>🏥 National Health Data Exchange</h1>
        <nav>
          {[
            { id: 'onboarding', label: 'Hospital Registration' },
            { id: 'mapping', label: 'Schema Mapping' },
            { id: 'ontology', label: 'Ontology Engine' },
            { id: 'dashboard', label: 'Central Dashboard' }
          ].map(module => (
            <button
              key={module.id}
              onClick={() => setCurrentModule(module.id)}
              style={{
                margin: '0 0.5rem',
                padding: '0.5rem 1rem',
                background: currentModule === module.id ? '#3b82f6' : 'transparent',
                border: '1px solid white',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {module.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        {currentModule === 'onboarding' && (
          <HospitalOnboarding onHospitalAdded={setHospitals} />
        )}
        {currentModule === 'mapping' && (
          <SchemaMapper hospitals={hospitals} />
        )}
        {currentModule === 'ontology' && (
          <OntologyResolver />
        )}
        {currentModule === 'dashboard' && (
          <CentralDashboard hospitals={hospitals} />
        )}
      </main>
    </div>
  );
}