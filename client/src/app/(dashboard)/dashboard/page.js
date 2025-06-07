import AppLiveConversation from '@/components/dashboard/AppLiveConversation';
import AppPrescription from '@/components/dashboard/AppPrescription';
import React from 'react';

function Page(props) {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppPrescription />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-1">
        <AppLiveConversation/>
      </div>
    </div>
  );
}

export default Page;