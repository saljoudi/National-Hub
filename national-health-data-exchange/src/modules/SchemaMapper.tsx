{/* 🎯 Magic Mapping - Automatic Field Recognition */}
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
        <div style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{sourceField}</div>
        <div>
          <select 
            value={mappings[sourceField] || mapping.target}
            onChange={(e) => setMappings({...mappings, [sourceField]: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              background: 'white'
            }}
          >
            {/* Patient Fields */}
            <optgroup label="Patient Registry">
              {Object.entries(CentralSchema.Patient.fields).map(([field, config]) => (
                <option key={`patient-${field}`} value={field}>
                  {field} - {config.description}
                </option>
              ))}
            </optgroup>
            
            {/* Encounter Fields */}
            <optgroup label="Encounter Registry">
              {Object.entries(CentralSchema.Encounter.fields).map(([field, config]) => (
                <option key={`encounter-${field}`} value={field}>
                  {field} - {config.description}
                </option>
              ))}
            </optgroup>
            
            {/* Laboratory Fields */}
            <optgroup label="Laboratory Registry">
              {Object.entries(CentralSchema.Laboratory.fields).map(([field, config]) => (
                <option key={`lab-${field}`} value={field}>
                  {field} - {config.description}
                </option>
              ))}
            </optgroup>
            
            {/* Pharmaceutical Fields */}
            <optgroup label="Pharmaceutical Registry">
              {Object.entries(CentralSchema.Pharmaceutical.fields).map(([field, config]) => (
                <option key={`pharma-${field}`} value={field}>
                  {field} - {config.description}
                </option>
              ))}
            </optgroup>
            
            {/* Claims Fields */}
            <optgroup label="Claims Registry">
              {Object.entries(CentralSchema.Claims.fields).map(([field, config]) => (
                <option key={`claims-${field}`} value={field}>
                  {field} - {config.description}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div style={{ 
          color: '#1e40af', 
          fontSize: '0.9rem',
          fontFamily: 'monospace'
        }}>
          {mapping.ontology}
        </div>
        <div style={{
          color: mapping.confidence > 0.9 ? 'green' : mapping.confidence > 0.8 ? 'orange' : 'red',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          {(mapping.confidence * 100).toFixed(0)}%
        </div>
      </React.Fragment>
    ))}
  </div>
</div>
