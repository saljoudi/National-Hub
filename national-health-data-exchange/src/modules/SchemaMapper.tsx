import React, { useState } from 'react';
import { HospitalSystemMappings, TerminologyCrosswalks } from '../ontology/hospitalMappings';
import { CentralSchema } from '../ontology/centralSchema';

const sampleData = {
  'legacy_ehr_v1': [
    { 
      'PT_ID': 'HOSP-001', 
      'PATIENT_NAME': 'John Smith', 
      'BIRTH_DATE': '1985-03-15', 
      'VISIT_TYPE': 'EMER',
      'GENDER': 'M'
    }
  ],
  'medsoft_international': [
    { 
      'PatientID': 'MS-67890', 
      'FullName': 'Maria Garcia', 
      'DOB': '1990-07-22', 
      'VisitType': 'OP',
      'MedicationName': 'Amoxicillin'
    }
  ],
  'claimmaster_pro': [
    {
      'SubscriberID': 'CLM-12345',
      'PatientName': 'Robert Johnson',
      'ServiceDate': '2024-01-15',
      'ProcedureCode': 'AMB',
      'BilledAmount': '250.00'
    }
  ],
  'labsystem_5000': [
    {
      'SpecimenID': 'LAB-12345',
      'PatientID': 'PT-001',
      'TestCode': 'GLUCOSE',
      'ResultValue': '95',
      'Units': 'mg/dL'
    }
  ]
};

export function SchemaMapper({ hospitals }: { hospitals: any[] }) {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const hospital = hospitals.find(h => h.id === selectedHospital);
  const systemType = hospital?.systemType;
  const sampleRecords = systemType ? sampleData[systemType] : [];
  const automaticMappings = HospitalSystemMappings[systemType]?.fieldMappings || {};

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>
          🗺️ Schema Mapping Workbench
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select Hospital for Mapping
          </label>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">Choose a hospital...</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.systemName})
              </option>
            ))}
          </select>
        </div>

        {hospital && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <h3>Sample Data from {hospital.systemName}</h3>
              <div style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <pre>{JSON.stringify(sampleRecords, null, 2)}</pre>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3>🎯 Magic Mapping - Automatic Field Recognition</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr', 
                gap: '1rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <div style={{ fontWeight: 'bold' }}>Source Field</div>
                <div style={{ fontWeight: 'bold' }}>Target Field</div>
                <div style={{ fontWeight: 'bold' }}>Ontology Concept</div>
                <div style={{ fontWeight: 'bold' }}>Confidence</div>
                
                {Object.entries(automaticMappings).map(([sourceField, mapping]) => (
                  <React.Fragment key={sourceField}>
                    <div>{sourceField}</div>
                    <div>
                      <select 
                        value={mappings[sourceField] || mapping.target}
                        onChange={(e) => setMappings({...mappings, [sourceField]: e.target.value})}
                        style={{ width: '100%', padding: '0.25rem' }}
                      >
                        {Object.keys(CentralSchema.Patient.fields).map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                        {Object.keys(CentralSchema.Encounter.fields).map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ color: '#1e40af', fontSize: '0.9rem' }}>
                      {mapping.ontology}
                    </div>
                    <div style={{
                      color: mapping.confidence > 0.9 ? 'green' : mapping.confidence > 0.8 ? 'orange' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {(mapping.confidence * 100).toFixed(0)}%
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div style={{
              background: '#f0f9ff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '2px solid #1e40af',
              marginBottom: '2rem'
            }}>
              <h3>🧠 Ontology Intelligence Active</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <strong>System Detected:</strong><br />
                  {hospital.systemName}
                </div>
                <div>
                  <strong>Automatic Mappings:</strong><br />
                  {Object.keys(automaticMappings).length} fields
                </div>
                <div>
                  <strong>Data Format:</strong><br />
                  {HospitalSystemMappings[systemType]?.format}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3>🌍 International Terminology Crosswalk</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>Source Codes</div>
                  {Object.keys(TerminologyCrosswalks.encounter_types).slice(0, 3).map(code => (
                    <div key={code}>{code}</div>
                  ))}
                </div>
                
                <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div>→ Standardization →</div>
                </div>
                
                <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>Standardized Meaning</div>
                  {Object.values(TerminologyCrosswalks.encounter_types).slice(0, 3).map(meaning => (
                    <div key={meaning.code}>{meaning.standard}</div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}