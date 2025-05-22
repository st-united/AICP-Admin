export interface Mentor {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  avatarUrl: string;
  expertise: string;
}

export interface MentorCreateDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  expertise: string;
}
