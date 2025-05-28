export interface MentorCreateDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  expertise: string;
}

export interface MentorUpdateDataDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export interface MentorUpdateDto {
  id: number;
  data: MentorUpdateDataDto;
}
