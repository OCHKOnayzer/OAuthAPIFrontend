import { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const oneTapInitialized = useRef(false);
  const codeVerifier = 'FGH767Gd65dsf76TgBh98vGbvDsF7GhEtr67ghjhufFGH767Gd65dsf76TggBh98vGbv';

  useEffect(() => {
    VKID.Config.init({
      app: '52336772',
      redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app/vkIdTest',
      scope: 'email phone',
      codeVerifier: codeVerifier,
      state: 'dj29fnsadjsd8а2',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current })
        .on(VKID.WidgetEvents.ERROR, (error) => {
          console.error('Ошибка рендеринга One Tap:', error);
        });
      oneTapInitialized.current = true;
    }
  }, []);
  
  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default VKIDAuthComponent;
