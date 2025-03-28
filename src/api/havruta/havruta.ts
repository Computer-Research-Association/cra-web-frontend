import { Havruta } from '~/models/Havruta.ts';
import { authClient } from '~/api/auth/authClient.ts';

// /api/havruta
export const getAllHavrutas = async () => {
  try {
    const response = await authClient.get<Havruta[]>(`/havruta`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// /api/admin/havruta
export const getHavrutas = async () => {
  try {
    const response = await authClient.get<Havruta[]>(`/admin/havruta`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHavrutaById = async (id: number) => {
  try {
    const response = await authClient.get<Havruta>(`/admin/havruta/view/${id}`);
    const havruta = response.data;

    return {
      ...havruta,
      createdAt: havruta.createdAt ? new Date(havruta.createdAt) : new Date(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createHavruta = async (havruta: Havruta) => {
  try {
    const response = await authClient.post<Havruta>('/admin/havruta', havruta, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateHavruta = async (havruta: Havruta) => {
  try {
    const response = await authClient.put<Havruta>(
      `/admin/havruta/${havruta.id}`,
      havruta,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteHavruta = async (id: number): Promise<Havruta> => {
  try {
    const response = await authClient.delete<Havruta>(`/admin/havruta/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
