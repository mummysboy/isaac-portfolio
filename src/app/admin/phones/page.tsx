import { PhoneNumberManager } from '@/components/PhoneNumberManager';
import { UserCreationGuide } from '@/components/UserCreationGuide';

export default function AdminPhonesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage approved phone numbers and user accounts.
          </p>
        </div>
        
        <div className="space-y-8">
          <PhoneNumberManager isAdmin={true} />
          <UserCreationGuide isAdmin={true} />
        </div>
      </div>
    </div>
  );
} 