import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiGetUsers } from '../../../services/products';
import UserModal from '../../dashboard/admin/AddUsermodal';

const UserManagement = () => {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiGetUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasPermission('getUsers')) {
      fetchUsers();
    }
  }, [hasPermission]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'buyer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserSuccess = () => {
    // Refresh users list after successful operation
    if (hasPermission('getUsers')) {
      const fetchUsers = async () => {
        try {
          const response = await apiGetUsers();
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
      fetchUsers();
    }
    setShowModal(false);
    setEditingUser(null);
  };

  if (!hasPermission('getUsers')) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">You don't have permission to view users.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, farmers, and administrators</p>
        </div>
        {hasPermission('createUser') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Buyers</option>
              <option value="farmer">Farmers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-gray-600">Loading users...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.contact}</div>
                      <div className="text-sm text-gray-500">{user.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.isActive ? (
                          <UserCheck className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <UserX className="w-5 h-5 text-red-500 mr-2" />
                        )}
                        <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-900 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {hasPermission('updateUser') && (
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {hasPermission('deleteUser') && (
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <UserModal
          editingUser={editingUser}
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          onSuccess={handleUserSuccess}
        />
      )}
    </div>
  );
};

export default UserManagement;