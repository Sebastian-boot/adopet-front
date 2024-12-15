import { UserRegistrationFormData } from "../../Interfaces/FormInscriptionData";

export const initialFormData: UserRegistrationFormData = {
  name: "",
  lastName: "",
  personalId: "",
  birthDate: "",
  phoneNumber: "",
  address: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  prefix: "57",
  terms_conditions: false,
  foundation: {
    name: "",
    legalName: "",
    nit: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    mission: "",
    vision: "",
    logo: "",
    location: {
      latitude: 0,
      longitude: 0,
      address: "",
      city: "",
      postalCode: "",
    },
    legalRepresentatives: [
      {
        name: "",
        lastName: "",
        personalId: "",
        email: "",
        phoneNumber: "",
        address: "",
      },
    ],
  }
};

