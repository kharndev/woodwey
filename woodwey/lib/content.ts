export type CatalogItem = {
  id: string
  name: string
  category: 'Living' | 'Dining' | 'Workspace' | 'Bedroom' | 'Storage'
  image: string
  alt: string
  ratio: 'portrait' | 'landscape' | 'square'
}

export const catalog: CatalogItem[] = [
  { id: 'arc-lounge', name: 'Arc Lounge Chair', category: 'Living', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85', alt: 'Sculptural timber lounge chair in a warm interior', ratio: 'portrait' },
  { id: 'axis-table', name: 'Axis Dining Table', category: 'Dining', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85', alt: 'Solid wood dining table in a calm dining room', ratio: 'landscape' },
  { id: 'fold-sofa', name: 'Fold Modular Sofa', category: 'Living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85', alt: 'Olive modular sofa in a modern living room', ratio: 'landscape' },
  { id: 'field-desk', name: 'Field Executive Desk', category: 'Workspace', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85', alt: 'Premium contemporary office workspace', ratio: 'portrait' },
  { id: 'line-console', name: 'Line Media Console', category: 'Storage', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85', alt: 'Timber media console in a composed interior', ratio: 'square' },
  { id: 'rest-bed', name: 'Rest Platform Bed', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1400&q=85', alt: 'Quiet bedroom with crafted platform bed', ratio: 'landscape' },
  { id: 'joinery-wall', name: 'Tailored Joinery Wall', category: 'Storage', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', alt: 'Custom wall joinery in a refined residential space', ratio: 'portrait' },
  { id: 'communal-table', name: 'Common Table', category: 'Workspace', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', alt: 'Long communal work table in a bright studio', ratio: 'landscape' },
]

export const projects = [
  { name: 'The Quiet Residence', location: 'Lagos · Residential', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=88', alt: 'Warm contemporary living room with custom joinery' },
  { name: 'Meridian House', location: 'Abuja · Residential', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88', alt: 'Refined living room with sculptural furniture' },
  { name: 'The Workroom', location: 'Lagos · Workplace', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=88', alt: 'Contemporary workplace with warm timber details' },
  { name: 'Civic Table', location: 'Ibadan · Institutional', image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1800&q=88', alt: 'Modern collaboration space with timber furniture' },
]
