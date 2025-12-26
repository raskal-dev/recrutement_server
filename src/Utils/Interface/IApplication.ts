export interface IApplication {
    id?: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    coverLetter?: string;
    UserId: string;
    OfferId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

