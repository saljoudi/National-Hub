// PRE-CONFIGURED HOSPITAL SYSTEM MAPPINGS WITH ONTOLOGY SUPPORT
export const HospitalSystemMappings = {
  'legacy_ehr_v1': {
    name: 'Legacy EHR System v1.0',
    format: 'CSV',
    description: 'Older electronic health record system with custom coding',
    fieldMappings: {
      'PT_ID': { 
        target: 'nationalPatientId', 
        confidence: 0.97, // Increased - very clear patient ID
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'PATIENT_NAME': { 
        target: 'fullName', 
        confidence: 0.99, // Increased - extremely obvious
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'BIRTH_DATE': { 
        target: 'dateOfBirth', 
        confidence: 0.998, // Near perfect - very clear
        ontology: 'patient.demographic.birthdate',
        transformation: 'date_standardization'
      },
      'VISIT_TYPE': { 
        target: 'encounterType', 
        confidence: 0.94, // Increased - clear mapping
        ontology: 'encounter.type',
        transformation: 'code_mapping'
      },
      'LAB_TEST_CODE': { 
        target: 'testName', // FIXED: Was incorrectly nationalPatientId
        confidence: 0.89, // Lower - "CODE" vs "NAME" requires interpretation
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'GENDER': { 
        target: 'gender', 
        confidence: 0.99, // Increased - extremely obvious
        ontology: 'patient.demographic.gender',
        transformation: 'hl7_gender_mapping'
      }
    }
  },
  
  'medsoft_international': {
    name: 'MedSoft International EHR',
    format: 'JSON',
    description: 'Modern EHR system with international standards support',
    fieldMappings: {
      'PatientID': { 
        target: 'nationalPatientId', 
        confidence: 0.98, // Increased - clear mapping
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'FullName': { 
        target: 'fullName', 
        confidence: 0.995, // Near perfect - exact match
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'DOB': { 
        target: 'dateOfBirth', 
        confidence: 0.99, // Increased - standard abbreviation
        ontology: 'patient.demographic.birthdate',
        transformation: 'date_standardization'
      },
      'VisitType': { 
        target: 'encounterType', 
        confidence: 0.95, // Increased - clear mapping
        ontology: 'encounter.type',
        transformation: 'code_mapping'
      },
      'LabTest': { 
        target: 'testName', // FIXED: Was incorrectly nationalPatientId
        confidence: 0.92, // Good - clear lab test mapping
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'MedicationName': { 
        target: 'medicationName', // FIXED: Was incorrectly nationalPatientId
        confidence: 0.96, // High - very clear medication mapping
        ontology: 'medication.name',
        transformation: 'rxnorm_mapping'
      }
    }
  },
  
  'claimmaster_pro': {
    name: 'ClaimMaster Professional Billing',
    format: 'Billing',
    description: 'Healthcare billing and claims management system',
    fieldMappings: {
      'SubscriberID': { 
        target: 'nationalPatientId', 
        confidence: 0.87, // Lower - subscriber vs patient requires interpretation
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'PatientName': { 
        target: 'fullName', 
        confidence: 0.98, // High - clear mapping
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'ServiceDate': { 
        target: 'startDate', 
        confidence: 0.85, // Lower - service date vs encounter start requires context
        ontology: 'encounter.timing.start',
        transformation: 'date_standardization'
      },
      'ProcedureCode': { 
        target: 'encounterType', 
        confidence: 0.79, // Lower - procedure code to encounter type requires mapping
        ontology: 'encounter.type',
        transformation: 'cpt_mapping'
      },
      'BilledAmount': { 
        target: 'amount', 
        confidence: 0.96, // High - very clear amount mapping
        ontology: 'claim.amount',
        transformation: 'direct'
      }
    }
  },
  
  'labsystem_5000': {
    name: 'LabSystem 5000 LIS',
    format: 'HL7v2',
    description: 'Laboratory information system with HL7v2 interface',
    fieldMappings: {
      'SpecimenID': { 
        target: 'testId', 
        confidence: 0.97, // High - clear specimen to test mapping
        ontology: 'laboratory.test.identity',
        transformation: 'direct'
      },
      'PatientID': { 
        target: 'patientId', 
        confidence: 0.99, // Near perfect - exact match
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'TestCode': { 
        target: 'testName', 
        confidence: 0.93, // Good - code to name requires interpretation
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'ResultValue': { 
        target: 'resultValue', 
        confidence: 0.995, // Near perfect - exact match
        ontology: 'laboratory.result.value',
        transformation: 'direct'
      },
      'Units': { 
        target: 'resultUnit', 
        confidence: 0.98, // High - clear units mapping
        ontology: 'laboratory.result.unit',
        transformation: 'unit_standardization'
      }
    }
  }
};

// SEMANTIC HARMONIZATION ACROSS HEALTHCARE TERMINOLOGIES
export const TerminologyCrosswalks = {
  // HL7 Gender Codes
  'hl7_gender': {
    'M': { standard: 'Male', code: 'M', system: 'HL7' },
    'F': { standard: 'Female', code: 'F', system: 'HL7' },
    'U': { standard: 'Unknown', code: 'U', system: 'HL7' },
    'O': { standard: 'Other', code: 'O', system: 'HL7' }
  },
  
  // LOINC Laboratory Codes
  'loinc_codes': {
    'GLUCOSE': { standard: 'Glucose', code: '2345-7', system: 'LOINC' },
    'HEMOGLOBIN': { standard: 'Hemoglobin', code: '718-7', system: 'LOINC' },
    'CHOLESTEROL': { standard: 'Cholesterol', code: '2093-3', system: 'LOINC' },
    'GLUCOSE_Fasting': { standard: 'Glucose Fasting', code: '1558-6', system: 'LOINC' },
    'SODIUM': { standard: 'Sodium', code: '2951-2', system: 'LOINC' },
    'POTASSIUM': { standard: 'Potassium', code: '2823-3', system: 'LOINC' }
  },
  
  // RxNorm Medication Codes
  'rxnorm_codes': {
    'AMOXICILLIN': { standard: 'Amoxicillin', code: '723', system: 'RxNorm' },
    'LISINOPRIL': { standard: 'Lisinopril', code: '29046', system: 'RxNorm' },
    'ATORVASTATIN': { standard: 'Atorvastatin', code: '83367', system: 'RxNorm' },
    'METFORMIN': { standard: 'Metformin', code: '6809', system: 'RxNorm' },
    'INSULIN': { standard: 'Insulin', code: '203459', system: 'RxNorm' },
    'ASPIRIN': { standard: 'Aspirin', code: '1191', system: 'RxNorm' }
  },
  
  // CPT Procedure Codes
  'cpt_codes': {
    'AMB': { standard: 'Office Visit', code: '99213', system: 'CPT' },
    'EMER': { standard: 'Emergency Visit', code: '99284', system: 'CPT' },
    'SURGERY': { standard: 'Surgery', code: '49505', system: 'CPT' },
    'LAB_BASIC': { standard: 'Basic Metabolic Panel', code: '80048', system: 'CPT' },
    'XRAY_CHEST': { standard: 'Chest X-Ray', code: '71045', system: 'CPT' },
    'MRI_BRAIN': { standard: 'MRI Brain', code: '70551', system: 'CPT' }
  },
  
  // Encounter Type Mapping
  'encounter_types': {
    'AMB': { standard: 'Ambulatory', code: 'AMB', system: 'Encounter-Type' },
    'EMER': { standard: 'Emergency', code: 'EMER', system: 'Encounter-Type' },
    'IMP': { standard: 'Inpatient', code: 'IMP', system: 'Encounter-Type' },
    'OP': { standard: 'Outpatient', code: 'OP', system: 'Encounter-Type' },
    'URGENT': { standard: 'Urgent Care', code: 'URGENT', system: 'Encounter-Type' },
    'TELE': { standard: 'Telehealth', code: 'TELE', system: 'Encounter-Type' }
  }
};
