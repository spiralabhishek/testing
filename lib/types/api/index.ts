// /lib/api-response.ts

export type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: {
      code: string;
      message: string;
    };
    meta?: {
      page?: number;
      limit?: number;
      total?: number;
    };
  };
  
  
  export function createApiResponse<T>(
    success: boolean,
    data?: T,
    error?: { code: string; message: string },
    meta?: ApiResponse['meta']
  ): ApiResponse<T> {
    return { success, data, error, meta };
  }
  