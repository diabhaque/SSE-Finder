export type Case = {
    "case_number": number | null;
    "person_name": string | null;
    "identify_document_number": string | null;
    "date_of_birth": string | null;
    "date_of_onset_of_symptoms": string | null;
    "date_of_confirmation_of_infection_by_testing": string | null;
    "events"?: any;
}