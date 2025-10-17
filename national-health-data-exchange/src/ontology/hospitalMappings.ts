// PRE-CONFIGURED HOSPITAL SYSTEM MAPPINGS WITH ONTOLOGY SUPPORT
export const HospitalSystemMappings = {
  'legacy_ehr_v1': {
    name: 'Legacy EHR System v1.0',
    format: 'CSV',
    description: 'Older electronic health record system with custom coding',
    fieldMappings: {
      'PT_ID': { 
        target: 'nationalPatientId', 
        confidence: 0.95, 
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'PATIENT_NAME': { 
        target: 'fullName', 
        confidence: 0.90, 
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'BIRTH_DATE': { 
        target: 'dateOfBirth', 
        confidence: 0.98, 
        ontology: 'patient.demographic.birthdate',
        transformation: 'date_standardization'
      },
      'VISIT_TYPE': { 
        target: 'encounterType', 
        confidence: 0.85, 
        ontology: 'encounter.type',
        transformation: 'code_mapping'
      },
      'LAB_TEST_CODE': { 
        target: 'testName', 
        confidence: 0.88, 
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'GENDER': { 
        target: 'gender', 
        confidence: 0.92, 
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
        confidence: 0.92, 
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'FullName': { 
        target: 'fullName', 
        confidence: 0.94, 
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'DOB': { 
        target: 'dateOfBirth', 
        confidence: 0.96, 
        ontology: 'patient.demographic.birthdate',
        transformation: 'date_standardization'
      },
      'VisitType': { 
        target: 'encounterType', 
        confidence: 0.88, 
        ontology: 'encounter.type',
        transformation: 'code_mapping'
      },
      'LabTest': { 
        target: 'testName', 
        confidence: 0.91, 
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'MedicationName': { 
        target: 'medicationName', 
        confidence: 0.89, 
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
        confidence: 0.89, 
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'PatientName': { 
        target: 'fullName', 
        confidence: 0.93, 
        ontology: 'patient.demographic.name',
        transformation: 'direct'
      },
      'ServiceDate': { 
        target: 'startDate', 
        confidence: 0.87, 
        ontology: 'encounter.timing.start',
        transformation: 'date_standardization'
      },
      'ProcedureCode': { 
        target: 'encounterType', 
        confidence: 0.82, 
        ontology: 'encounter.type',
        transformation: 'cpt_mapping'
      },
      'BilledAmount': { 
        target: 'amount', 
        confidence: 0.95, 
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
        confidence: 0.96, 
        ontology: 'laboratory.test.identity',
        transformation: 'direct'
      },
      'PatientID': { 
        target: 'patientId', 
        confidence: 0.94, 
        ontology: 'patient.identity',
        transformation: 'direct'
      },
      'TestCode': { 
        target: 'testName', 
        confidence: 0.97, 
        ontology: 'laboratory.test.name',
        transformation: 'loinc_mapping'
      },
      'ResultValue': { 
        target: 'resultValue', 
        confidence: 0.99, 
        ontology: 'laboratory.result.value',
        transformation: 'direct'
      },
      'Units': { 
        target: 'resultUnit', 
        confidence: 0.98, 
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
    'CHOLESTEROL': { standard: 'Cholesterol', code: '2093-3', system: 'LOINC' }
  },
  
  // RxNorm Medication Codes
  'rxnorm_codes': {
    'AMOXICILLIN': { standard: 'Amoxicillin', code: '723', system: 'RxNorm' },
    'LISINOPRIL': { standard: 'Lisinopril', code: '29046', system: 'RxNorm' },
    'ATORVASTATIN': { standard: 'Atorvastatin', code: '83367', system: 'RxNorm' }
  },
  
  // CPT Procedure Codes
  'cpt_codes': {
    'AMB': { standard: 'Office Visit', code: '99213', system: 'CPT' },
    'EMER': { standard: 'Emergency Visit', code: '99284', system: 'CPT' },
    'SURGERY': { standard: 'Surgery', code: '49505', system: 'CPT' }
  },
  
  // Encounter Type Mapping
  'encounter_types': {
    'AMB': { standard: 'Ambulatory', code: 'AMB', system: 'Encounter-Type' },
    'EMER': { standard: 'Emergency', code: 'EMER', system: 'Encounter-Type' },
    'IMP': { standard: 'Inpatient', code: 'IMP', system: 'Encounter-Type' },
    'OP': { standard: 'Outpatient', code: 'OP', system: 'Encounter-Type' }
  }
};