export interface Payment {
    pixKey: string;
    amount: number;
    schedule?: Date;
    pixKeyType: string;
}

export interface PaymentResponse {
    payment: Payment,
    qr_code: string;
    pix_key: string;
}

export interface Transaction {
    id: number;
    pixKey: string;
    amount: number;
    status: string;
    createdAt: string;
    pixKeyType: string;
    scheduledAt?: Date;
}

export interface TransactionResponse {
    id: number;
    pix_key: string;
    amount: number;
    status: string;
    created_at: string;
    pix_key_type: string;
    scheduled_at?: Date;
}