export interface SocialMedia {
    whatsapp: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    linkedin: string;
    youtube: string;
    link: string;
}

export interface PriceList {
    title: string;
    price: number;
}

export interface FAQ {
    _id?: any;
    question: string;
    isDeleted?: boolean;
    answer: string;
}

export interface Availability {
    acceptingCalls: boolean;
    acceptingMessages: boolean;
    alwaysAvailable: boolean;
    availableTimes: AvailableTime[];
}

export interface AvailableTime {
    day: string;
    startTime: string;
    endTime: string;
}

export interface Banner {
    text: string;
    link: string;
}

export interface Subscription {
    type: SubscriptionType;
    price: number;
    startDate: Date;
    endDate: Date;
}

export enum SubscriptionType {
    Lite = 'lite',
    Pro = 'pro',
    ProPlus = 'pro +',
    Promoter = 'promoter',
    Recruiter = 'recruiter'
}

export interface ILocation {
    city: string;
    country: string;
    address: string;
    remote: boolean;
    radiusKm: number;
    zip: number;
    coordinates: [number, number];
}

export interface GeoQueryParams {
    longitude?: number;
    latitude?: number;
    radiusKm?: number;
}

export interface Media {
    images: string[];
    videos: string[];
}

export interface TimeRange {
    from: number;
    to: number;
}

export enum UserType {
    Customer = 'Customer',
    Professional = 'Professional',
    Admin = 'Admin'
}

export enum Theme {
    Default = 'default',
}

export enum InquiryType {
    GENERAL_INQUIRY = 'GENERAL_INQUIRY',
    PRICE_QUOTE = 'PRICE_QUOTE',
    APPOINTMENT_BOOKING = 'APPOINTMENT_BOOKING',
    PROJECT_PROPOSAL = 'PROJECT_PROPOSAL',
    COLLABORATION_OPPORTUNITY = 'COLLABORATION_OPPORTUNITY',
    FEEDBACK_SUBMISSION = 'FEEDBACK_SUBMISSION',
    TECHNICAL_SUPPORT = 'TECHNICAL_SUPPORT',
    COMPLAINT = 'COMPLAINT',
    REFUND_REQUEST = 'REFUND_REQUEST',
    PARTNERSHIP_PROPOSAL = 'PARTNERSHIP_PROPOSAL'
}
