import Script from 'next/script'

// Inside your <html> layout, add:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-ads-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-861109733');
  `}
</Script>
