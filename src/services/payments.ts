import { api } from "../utils/api";
import { Payment, PaymentResponse, TransactionResponse } from "../types/index";
import { AxiosResponse } from "axios";

export const getTransactionHistory = async (status?: string): Promise<TransactionResponse[]> => {
  try {
    const url = status === "pending" ? `/pix_transactions?status=pending` : status === "completed" ? `/pix_transactions?status=completed` : `/pix_transactions`;
    const response: AxiosResponse<TransactionResponse[]> = await api.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const transactions = response.data.map((transaction: TransactionResponse) => ({
      id: transaction.id,
      pixKey: transaction.pix_key,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.created_at,
      pixKeyType: transaction.pix_key_type,
      scheduledAt: transaction.scheduled_at,
    }));
    return transactions;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async (pix_transaction: Payment): Promise<PaymentResponse> => {
    try {
        const { pixKey, amount, schedule, pixKeyType } = pix_transaction;
        const response: AxiosResponse<PaymentResponse> = await api.post("/pix_transactions", { 
            pix_transaction: { 
                pix_key: pixKey, 
                amount, 
                scheduled_at: schedule || undefined, 
                pix_key_type: pixKeyType
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};