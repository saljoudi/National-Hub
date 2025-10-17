// ONTOLOGY-BASED CENTRAL SCHEMA
export const CentralSchema = {
  Patient: {
    name: "National Patient Registry",
    description: "Standardized patient demographic and identity information",
    fields: {
      nationalPatientId: { 
        type: 'string', 
        required: true, 
        ontology: 'patient.identity',
        description: 'Unique national patient identifier'
      },
      fullName: { 
        type: 'string', 
        ontology: 'patient.demographic.name',
        description: 'Patient full legal name'
      },
      dateOfBirth: { 
        type: 'date', 
        ontology: 'patient.demographic.birthdate',
        description: 'Patient date of birth'
      },
      gender: { 
        type: 'coded', 
        codeset: 'HL7-Gender', 
        ontology: 'patient.demographic.gender',
        description: 'Administrative gender'
      },
      nationality: { 
        type: 'string', 
        ontology: 'patient.demographic.nationality',
        description: 'Patient nationality'
      },
      address: { 
        type: 'string', 
        ontology: 'patient.demographic.address',
        description: 'Physical address'
      }
    }
  },
  
  Encounter: {
    name: "Unified Encounter Registry",
    description: "Healthcare visits and encounters across all facilities",
    fields: {
      encounterId: { 
        type: 'string', 
        required: true, 
        ontology: 'encounter.identity',
        description: 'Unique encounter identifier'
      },
      patientId: { 
        type: 'string', 
        required: true, 
        ontology: 'patient.identity',
        description: 'Reference to patient'
      },
      encounterType: { 
        type: 'coded', 
        codeset: 'Encounter-Type', 
        ontology: 'encounter.type',
        description: 'Type of healthcare encounter'
      },
      startDate: { 
        type: 'datetime', 
        ontology: 'encounter.timing.start',
        description: 'Encounter start date/time'
      },
      department: { 
        type: 'string', 
        ontology: 'facility.department',
        description: 'Healthcare department'
      },
      priority: { 
        type: 'coded', 
        codeset: 'Visit-Priority', 
        ontology: 'encounter.priority',
        description: 'Visit priority level'
      }
    }
  },
  
  Laboratory: {
    name: "Laboratory Results Registry",
    description: "Standardized laboratory test results and reports",
    fields: {
      testId: { 
        type: 'string', 
        required: true, 
        ontology: 'laboratory.test.identity',
        description: 'Unique test identifier'
      },
      patientId: { 
        type: 'string', 
        required: true, 
        ontology: 'patient.identity',
        description: 'Reference to patient'
      },
      testName: { 
        type: 'coded', 
        codeset: 'LOINC', 
        ontology: 'laboratory.test.name',
        description: 'Laboratory test name'
      },
      resultValue: { 
        type: 'string', 
        ontology: 'laboratory.result.value',
        description: 'Test result value'
      },
      resultUnit: { 
        type: 'string', 
        ontology: 'laboratory.result.unit',
        description: 'Unit of measurement'
      },
      referenceRange: { 
        type: 'string', 
        ontology: 'laboratory.result.reference',
        description: 'Normal reference range'
      }
    }
  },
  
  Pharmaceutical: {
    name: "Pharmaceutical Registry",
    description: "Medication prescriptions and dispensations",
    fields: {
      prescriptionId: { 
        type: 'string', 
        required: true, 
        ontology: 'medication.identity',
        description: 'Unique prescription identifier'
      },
      patientId: { 
        type: 'string', 
        required: true, 
        ontology: 'patient.identity',
        description: 'Reference to patient'
      },
      medicationName: { 
        type: 'coded', 
        codeset: 'RxNorm', 
        ontology: 'medication.name',
        description: 'Medication name'
      },
      dosage: { 
        type: 'string', 
        ontology: 'medication.dosage',
        description: 'Dosage instructions'
      },
      frequency: { 
        type: 'string', 
        ontology: 'medication.frequency',
        description: 'Administration frequency'
      }
    }
  },
  
  Claims: {
    name: "Claims & Billing Registry",
    description: "Healthcare billing and insurance claims data",
    fields: {
      claimId: { 
        type: 'string', 
        required: true, 
        ontology: 'claim.identity',
        description: 'Unique claim identifier'
      },
      patientId: { 
        type: 'string', 
        required: true, 
        ontology: 'patient.identity',
        description: 'Reference to patient'
      },
      serviceDate: { 
        type: 'date', 
        ontology: 'claim.service_date',
        description: 'Date of service'
      },
      procedureCode: { 
        type: 'coded', 
        codeset: 'CPT', 
        ontology: 'claim.procedure',
        description: 'Billing procedure code'
      },
      amount: { 
        type: 'number', 
        ontology: 'claim.amount',
        description: 'Billed amount'
      }
    }
  }
};

// ONTOLOGY CONCEPTS FOR SEMANTIC HARMONIZATION
export const OntologyConcepts = {
  'patient.identity': { domain: 'Patient', concept: 'Unique Identification', priority: 'high' },
  'patient.demographic.name': { domain: 'Patient', concept: 'Personal Name', priority: 'high' },
  'patient.demographic.birthdate': { domain: 'Patient', concept: 'Date of Birth', priority: 'high' },
  'patient.demographic.gender': { domain: 'Patient', concept: 'Administrative Gender', priority: 'medium' },
  'encounter.identity': { domain: 'Encounter', concept: 'Encounter Identification', priority: 'high' },
  'encounter.type': { domain: 'Encounter', concept: 'Visit Classification', priority: 'high' },
  'laboratory.test.identity': { domain: 'Laboratory', concept: 'Test Identification', priority: 'high' },
  'laboratory.test.name': { domain: 'Laboratory', concept: 'Test Procedure', priority: 'high' },
  'medication.identity': { domain: 'Pharmaceutical', concept: 'Prescription Identification', priority: 'high' },
  'medication.name': { domain: 'Pharmaceutical', concept: 'Drug Identification', priority: 'high' },
  'claim.identity': { domain: 'Claims', concept: 'Claim Identification', priority: 'high' },
  'claim.procedure': { domain: 'Claims', concept: 'Billing Procedure', priority: 'medium' }
};