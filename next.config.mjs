/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de produção otimizadas
  reactStrictMode: true,
  
  // Compressão habilitada
  compress: true,
  
  // Otimizar imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
