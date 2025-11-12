import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

// ==================== AUTH HOOKS ====================

// Login Hook - Connects to /api/admin/login on port 8081
export const useLogin = () => {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      console.log('🔐 Attempting login:', credentials.email);
      setLoading(true);
      const response = await api.post('/api/admin/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Login successful:', data);
      login(data);
      setLoading(false);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('❌ Login failed:', error);
      setLoading(false);
    },
  });
};

// Register Hook - Connects to /api/admin/register on port 8081
export const useRegister = () => {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (userData) => {
      console.log('📝 Attempting registration:', userData.email);
      setLoading(true);
      const response = await api.post('/api/admin/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Registration successful:', data);
      login(data);
      setLoading(false);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('❌ Registration failed:', error);
      setLoading(false);
    },
  });
};

// Logout Hook
export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    router.push('/login');
  };
};

// ==================== STUDENT HOOKS ====================

// Get All Students - /admins (GET)
export const useStudents = (options = {}) => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      console.log('📚 Fetching all students from /admins');
      const response = await api.get('/admins');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get Student by ID - /admins/{id} (GET)
export const useStudent = (id, options = {}) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      console.log('👤 Fetching student:', id);
      const response = await api.get(`/admins/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create Student - /admins (POST)
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentData) => {
      console.log('➕ Creating student:', studentData);
      const response = await api.post('/admins', studentData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Student created:', data);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create student:', error);
    },
  });
};

// Update Student - /admins/{id} (PUT)
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      console.log('✏️ Updating student:', id);
      const response = await api.put(`/admins/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('✅ Student updated:', data);
      queryClient.invalidateQueries({ queryKey: ['student', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      console.error('❌ Failed to update student:', error);
    },
  });
};

// Delete Student - /admins/{id} (DELETE)
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log('🗑️ Deleting student:', id);
      await api.delete(`/admins/${id}`);
      return id;
    },
    onSuccess: (id) => {
      console.log('✅ Student deleted:', id);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete student:', error);
    },
  });
};

// ==================== STUDENT PROFILE HOOKS ====================

// Create Student Profile - /admins/profile (POST)
export const useCreateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      console.log('📋 Creating student profile:', profileData);
      const response = await api.post('/admins/profile', profileData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Student profile created:', data);
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['studentProfiles'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create profile:', error);
    },
  });
};

// Get Student Profile - /admins/profile/{id} (GET)
export const useStudentProfile = (id, options = {}) => {
  return useQuery({
    queryKey: ['studentProfile', id],
    queryFn: async () => {
      console.log('📋 Fetching student profile:', id);
      const response = await api.get(`/admins/profile/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ==================== ADMIN HOOKS ====================

// Get Admin Student - /api/admin/students/{id} (GET)
export const useAdminStudent = (id, options = {}) => {
  return useQuery({
    queryKey: ['adminStudent', id],
    queryFn: async () => {
      console.log('👨‍💼 Admin fetching student:', id);
      const response = await api.get(`/api/admin/students/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Update Admin Student - /api/admin/students/{id} (PUT)
export const useUpdateAdminStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      console.log('👨‍💼 Admin updating student:', id);
      const response = await api.put(`/api/admin/students/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('✅ Admin student updated:', data);
      queryClient.invalidateQueries({ queryKey: ['adminStudent', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      console.error('❌ Admin update failed:', error);
    },
  });
};

// Delete Admin Student - /api/admin/students/{id} (DELETE)
export const useDeleteAdminStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log('👨‍💼 Admin deleting student:', id);
      await api.delete(`/api/admin/students/${id}`);
      return id;
    },
    onSuccess: (id) => {
      console.log('✅ Admin student deleted:', id);
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['adminStudent', id] });
    },
    onError: (error) => {
      console.error('❌ Admin delete failed:', error);
    },
  });
};

// Add Route - /api/admin/students/routes (POST)
export const useAddRoute = () => {
  return useMutation({
    mutationFn: async (routeData) => {
      console.log('🛣️ Adding route:', routeData);
      const response = await api.post('/api/admin/students/routes', routeData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Route added:', data);
    },
    onError: (error) => {
      console.error('❌ Failed to add route:', error);
    },
  });
};

// ==================== UTILITY HOOKS ====================

// Check Backend Connection
export const useBackendHealth = () => {
  return useQuery({
    queryKey: ['backendHealth'],
    queryFn: async () => {
      console.log('🏥 Checking backend health...');
      const response = await api.get('/actuator/health').catch(() => {
        return { data: { status: 'DOWN' } };
      });
      return response.data;
    },
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
  });
};