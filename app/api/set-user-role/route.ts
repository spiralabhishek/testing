// app/api/set-user-role/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; 

export async function POST(req: Request) {
 const { userId } = auth();
 if (!userId) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }

 try {
  const { role } = await req.json();
   
  if (!['customer', 'professional', 'admin'].includes(role)) {
   return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  await clerkClient.users.updateUser(userId, {
   publicMetadata: { role },
  });

  return NextResponse.json({ message: 'Role updated successfully' });
 } catch (error) {
  console.error('Error setting user role:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
 }
}
