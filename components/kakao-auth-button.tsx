'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Icons } from './icons';
import { createClient } from '@/utils/supabase/client';

export default function KakaoSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  async function signinWithKakao() {
    try {
      const supabase = await createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL}/api/auth/callback`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={async () => {
        await signinWithKakao();
      }}
    >
      <Icons.dashboard className="mr-2 h-4 w-4" />
      카카오로 로그인하기
    </Button>
  );
}
