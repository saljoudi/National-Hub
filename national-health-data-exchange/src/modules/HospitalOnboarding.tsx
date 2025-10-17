import React, { useState } from 'react';
import { HospitalSystemMappings } from '../ontology/hospitalMappings';

interface HospitalForm {
  name: string;
  systemType: string;
  dataSources: string[];
}

export function HospitalOnboarding({ onHospitalAdded }: { onHospitalAdded: (hospitals: any) => void }) {
  const [form, setForm] = useState<HospitalForm>({
    name: '',
    systemType: '',
    dataSources: []
  });

  const [hospitals, setHospitals] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHospital = {
      id: Date.now().toString(),
      name: form.name,
      systemType: form.systemType,
      systemName: HospitalSystemMappings[form.systemType]?.name || 'Unknown System',
      dataSources: form.dataSources,
      status: 'pending',
      onboardingDate: new Date().toISOString(),
      progress: 0,
      dataQuality: 0,
      format: HospitalSystemMappings[form.systemType]?.format || 'Unknown'
    };
    
    const updatedHospitals = [...hospitals, newHospital];
    setHospitals(updatedHospitals);
    onHospitalAdded(updatedHospitals);
    
    setForm({ name: '', systemType: '', dataSources: [] });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>
          🏥 Hospital Registration Portal
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Register healthcare facilities and configure their data source connections for ontology-based integration.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
              Hospital Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter hospital name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
              Hospital System Type
            </label>
            <select
              value={form.systemType}
              onChange={(e) => setForm({ ...form, systemType: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                background: 'white'
              }}
              required
            >
              <option value="">Select System Type</option>
              {Object.entries(HospitalSystemMappings).map(([key, system]) => (
                <option key={key} value={key}>
                  {system.name} ({system.format})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 'bold', color: '#374151' }}>
              Data Sources to Connect
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['EHR System', 'Billing System', 'Laboratory System', 'Pharmacy System'].map(source => (
                <label key={source} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: form.dataSources.includes(source) ? '#f0f9ff' : 'white',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={form.dataSources.includes(source)}
                    onChange={(e) => {
                      const sources = e.target.checked
                        ? [...form.dataSources, source]
                        : form.dataSources.filter(s => s !== source);
                      setForm({ ...form, dataSources: sources });
                    }}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {source}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: '#1e40af',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Register Hospital
          </button>
        </form>

        {/* CONNECTION STATUS DASHBOARD */}
        {hospitals.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Connection Status Dashboard</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {hospitals.map(hospital => (
                <div key={hospital.id} style={{
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: hospital.status === 'connected' ? '#f0f9ff' : '#fff',
                  borderLeft: `4px solid ${hospital.status === 'connected' ? '#10b981' : '#f59e0b'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.1rem', color: '#1f2937' }}>{hospital.name}</strong> 
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {hospital.systemName} • {hospital.format} Format
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                        Data Sources: {hospital.dataSources.join(', ')}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.5rem 1rem',
                      background: hospital.status === 'connected' ? '#dcfce7' : '#fef3c7',
                      color: hospital.status === 'connected' ? '#166534' : '#92400e',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {hospital.status === 'connected' ? '✅ Connected' : '🟡 Pending'}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Onboarding Progress</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1e40af' }}>25%</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      background: '#e5e7eb', 
                      borderRadius: '4px', 
                      height: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: '25%', 
                        background: '#1e40af', 
                        height: '6px',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}