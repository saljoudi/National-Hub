import React, { useState } from 'react';
import { HospitalOnboarding } from './modules/HospitalOnboarding';
import { SchemaMapper } from './modules/SchemaMapper';
import { OntologyResolver } from './modules/OntologyResolver';
import { CentralDashboard } from './modules/CentralDashboard';
import { ProblemSolutionShowcase } from './demo/ProblemSolutionShowcase';
import { UseCaseDemo } from './demo/UseCaseDemo';

export default function App() {
  const [currentModule, setCurrentModule] = useState('showcase');
  const [hospitals, setHospitals] = useState<any[]>([]);

  const navItems = [
    { id: 'showcase', label: '🚀 Solution Showcase', icon: '🚀' },
    { id: 'usecases', label: '🏥 Use Cases', icon: '🏥' },
    { id: 'onboarding', label: '📋 Hospital Registration', icon: '📋' },
    { id: 'mapping', label: '🗺️ Schema Mapping', icon: '🗺️' },
    { id: 'ontology', label: '🧠 Ontology Engine', icon: '🧠' },
    { id: 'dashboard', label: '📊 Central Dashboard', icon: '📊' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Enhanced Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏥 National Health Data Exchange
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
              Ontology-Driven Healthcare Interoperability Platform
            </p>
          </div>
          <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {navItems.map(module => (
              <button
                key={module.id}
                onClick={() => setCurrentModule(module.id)}
                style={{
                  padding: '0.75rem 1rem',
                  background: currentModule === module.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{module.icon}</span>
                {module.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        {currentModule === 'showcase' && <ProblemSolutionShowcase />}
        {currentModule === 'usecases' && <UseCaseDemo />}
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
