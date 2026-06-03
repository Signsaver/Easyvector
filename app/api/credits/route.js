import { auth } from '@clerk/nextjs/server';
import { getUserCredits, deductCredit } from '../../../lib/supabase';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const credits = await getUserCredits(userId);
    return Response.json(credits);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const updated = await deductCredit(userId);
    return Response.json(updated);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
