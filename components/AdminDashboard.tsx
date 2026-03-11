import React, { useState } from 'react';
import { User } from '../types.ts';
import { Button } from './Button.tsx';

interface AdminDashboardProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, 
  onUpdateUser, 
  onDeleteUser,
  onBack 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    pro: users.filter(u => u.plan === 'pro').length,
    totalMessages: users.reduce((acc, u) => acc + u.stats.messagesSent, 0),
    avgMessages: users.length ? (users.reduce((acc, u) => acc + u.stats.messagesSent, 0) / users.length).toFixed(1) : 0
  };

  const togglePro = (user: User) => {
    onUpdateUser({
      ...user,
      plan: user.plan === 'pro' ? 'free' : 'pro',
      stats: {
        ...user.stats,
        dailyLimit: user.plan === 'pro' ? 25 : 9999
      }
    });
  };

  const resetLimit = (user: User) => {
    onUpdateUser({
      ...user,
      stats: {
        ...user.stats,
        messagesSent: 0
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-6 md:p-12 font-sans selection:bg-green-500/20">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-[#0f172a]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">Admin <span className="text-green-500 underline decoration-green-500/30">Control Center</span></h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Live Firebase Backend Management • v1.1.0</p>
          </div>
          <Button onClick={onBack} variant="outline" className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">
            Exit to App
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Learners', value: stats.total, icon: 'Users', color: 'text-blue-400' },
            { label: 'Pro Accounts', value: stats.pro, icon: 'Shield', color: 'text-yellow-400' },
            { label: 'Total Messages', value: stats.totalMessages, icon: 'Message', color: 'text-green-400' },
            { label: 'Avg Messages/User', value: stats.avgMessages, icon: 'Activity', color: 'text-purple-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#1e293b] p-6 rounded-[2rem] border border-slate-800 shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b] rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between gap-4">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              Learner Registry
              <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">{filteredUsers.length} Results</span>
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search email or name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0f172a] border border-slate-700 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-green-500 w-full md:w-64 transition-all"
              />
              <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-4">Learner</th>
                  <th className="px-8 py-4">Account Status</th>
                  <th className="px-8 py-4">Usage</th>
                  <th className="px-8 py-4">Joined</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center font-black text-slate-300 group-hover:bg-green-500 group-hover:text-[#0f172a] transition-all">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${user.plan === 'pro' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-slate-700 text-slate-400'}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold text-slate-300">{user.stats.messagesSent} / {user.stats.dailyLimit === 9999 ? '∞' : user.stats.dailyLimit}</p>
                        <div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${Math.min((user.stats.messagesSent / (user.stats.dailyLimit || 25)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => togglePro(user)}
                          className={`p-2 rounded-lg text-xs font-black uppercase transition-all ${user.plan === 'pro' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600 hover:text-white'}`}
                        >
                          {user.plan === 'pro' ? 'Demote' : 'Make Pro'}
                        </button>
                        <button 
                          onClick={() => resetLimit(user)}
                          className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-green-600 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                        <button 
                          onClick={() => onDeleteUser(user.id)}
                          className="p-2 bg-slate-700 rounded-lg text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div> Cloud Database Connected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Real-time Sync Active
          </div>
        </div>
      </div>
    </div>
  );
};