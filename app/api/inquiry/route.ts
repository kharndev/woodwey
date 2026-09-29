import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

export async function POST(request: Request) {
  const data = await request.formData()
  const inquiryType = String(data.get('inquiryType') || '')
  const catalogRequest = inquiryType === 'catalog_request'
  const selectionProject = inquiryType === 'selection_project'
  const required = catalogRequest
    ? ['name', 'email', 'phone', 'leadType']
    : selectionProject
      ? ['name', 'email', 'phone', 'projectDetails', 'selection']
      : ['name', 'email', 'phone', 'space', 'need', 'details']

  for (const key of required) {
    if (!String(data.get(key) || '').trim()) {
      return NextResponse.json({ error: `Please complete the ${key} field.` }, { status: 400 })
    }
  }

  const email = String(data.get('email'))
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const leadType = String(data.get('leadType') || '')
  if (catalogRequest && !['Individual', 'Representing a company'].includes(leadType)) {
    return NextResponse.json({ error: 'Please tell us whether you are requesting as an individual or for a company.' }, { status: 400 })
  }
  if (selectionProject && !/^[+\d][\d\s().-]{6,}$/.test(String(data.get('phone')).trim())) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }

  const photos = data.getAll('photos').filter((x): x is File => x instanceof File)
  if (photos.length > 5 || photos.some(file => file.size > 5 * 1024 * 1024 || !allowedTypes.has(file.type))) {
    return NextResponse.json({ error: 'Upload up to 5 JPG, PNG or WebP images under 5 MB each.' }, { status: 400 })
  }
  if (!process.env.INQUIRY_WEBHOOK_URL) {
    return NextResponse.json({ error: 'Online delivery is not configured yet. Please contact Woodwey on WhatsApp or by phone.' }, { status: 503 })
  }

  const payload = new FormData()
  for (const [key, value] of data.entries()) payload.append(key, value)
  if (selectionProject) {
    const references = String(data.get('selection')).trim()
    const projectDetails = String(data.get('projectDetails')).trim()
    const company = String(data.get('company') || '').trim()
    // The existing Make email already maps these fields. Include every part of
    // this enquiry in details as well, so the team sees it without remapping.
    payload.set('space', 'Selected catalogue references')
    payload.set('need', 'Project enquiry')
    payload.set('details', [projectDetails, `Selected references:\n${references}`, company && `Company: ${company}`].filter(Boolean).join('\n\n'))
  }

  try {
    const result = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
      method: 'POST',
      body: payload,
      headers: process.env.INQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` } : {},
    })
    if (!result.ok) {
      return NextResponse.json({ error: selectionProject ? 'Your project details could not be delivered. Please try again.' : 'Your request could not be delivered. Please try WhatsApp instead.' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'Woodwey could not be reached right now. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ message: catalogRequest
    ? 'Thank you. Your catalog request has been received. Woodwey will be in touch shortly.'
    : selectionProject
      ? 'Your project details have been sent to Woodwey.'
      : 'Thank you. Your project brief has been delivered to Woodwey.' })
}
