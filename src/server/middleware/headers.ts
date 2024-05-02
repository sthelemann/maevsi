import { getCspAsString } from '~/server/utils/security'

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()
  const headers = getHeaders(event)

  // todo: replace with platform detection composable
  if (headers['maevsi-platform']) {
    console.log(`maevsi-platform header: ${headers['maevsi-platform']}`)
  }

  appendHeader(event, 'Content-Security-Policy', getCspAsString(event)) // TODO: migrate to nuxt-security header (https://github.com/maevsi/maevsi/issues/1416)

  appendHeader(
    event,
    'NEL',
    '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
  )
  appendHeader(
    event,
    'Report-To',
    `'{"group":"default","max_age":31536000,"endpoints":[{"url":"https://${runtimeConfig.public.sentry.host}/api/${runtimeConfig.public.sentry.project.client.id}/security/?sentry_key=${runtimeConfig.public.sentry.project.client.publicKey}&sentry_environment=${runtimeConfig.public.vio.environment}&sentry_release=${runtimeConfig.public.vio.releaseName}"}],"include_subdomains":true}'`,
  )
})
