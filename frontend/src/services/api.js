const API_BASE_URL = 'http://localhost:8080/api/v1';

export async function loginApi(data, useMock = false) {
  if (useMock) {
    if (data.username === 'admin' || data.username === 'manager_agri' || (data.username && data.password)) {
      const userRole = data.username === 'admin' ? 'ROLE_ADMIN' : data.username === 'manager_agri' ? 'ROLE_TRADER' : 'ROLE_USER';
      const userFullName = data.username === 'admin' ? 'Quản Trị Viên (Admin)' : data.username === 'manager_agri' ? 'Quản Lý Thu Mua (Manager)' : 'Nông Dân (User)';
      return {
        status: 200,
        message: `Đăng nhập giả lập thành công với quyền [${userRole}]!`,
        data: {
          token: 'mock-jwt-token-2026',
          id: Date.now(),
          username: data.username,
          email: `${data.username}@nextfarm.vn`,
          fullName: userFullName,
          role: userRole
        }
      };
    }
    throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác!');
  }

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username,
      password: data.password
    })
  });

  const responseData = await res.json();
  if (!res.ok) throw new Error(responseData.message || 'Đăng nhập thất bại!');
  return responseData;
}

export async function registerApi(data, useMock = false) {
  if (useMock) {
    return {
      status: 201,
      message: `Đăng ký thành công tài khoản [${data.role || 'ROLE_USER'}]!`,
      data: {
        token: 'mock-jwt-token-2026',
        id: Date.now(),
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role || 'ROLE_USER'
      }
    };
  }

  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const responseData = await res.json();
  if (!res.ok) throw new Error(responseData.message || 'Đăng ký thất bại!');
  return responseData;
}
