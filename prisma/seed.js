const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@GFF2024', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@gudalafoundation.org' },
    update: {},
    create: {
      name: 'Foundation Admin',
      email: 'admin@gudalafoundation.org',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Site settings
  const settings = [
    { key: 'site_name', value: 'Gudala Family Foundation' },
    { key: 'site_tagline', value: 'Together, We Can Build a Better Tomorrow' },
    { key: 'site_description', value: 'Gudala Family Foundation is committed to uplifting underserved communities through education, healthcare, women empowerment, and sustainable development programs.' },
    { key: 'hero_heading', value: 'Together, We Can Build a Better Tomorrow' },
    { key: 'hero_subheading', value: 'Gudala Family Foundation works at the grassroots level, bringing education, healthcare, and hope to communities that need it most.' },
    { key: 'hero_image', value: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80' },
    { key: 'about_heading', value: 'Serving Communities With Compassion, Dignity & Purpose' },
    { key: 'about_content', value: 'Gudala Family Foundation was established with a singular vision: to stand beside communities that have been left behind. We believe every person deserves access to quality education, healthcare, and opportunity.\n\nRooted in the values of compassion and service, our foundation works alongside local communities â€” not above them â€” to create lasting, meaningful change.\n\n[Additional foundation history and background to be provided by the client]' },
    { key: 'about_image', value: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80' },
    { key: 'mission', value: 'To empower underserved communities through sustainable programs in education, healthcare, women empowerment, and livelihood development â€” fostering dignity, self-reliance, and long-term wellbeing.' },
    { key: 'vision', value: 'A world where every individual, regardless of background or circumstance, has equal access to education, healthcare, and opportunity â€” and can live with dignity and purpose.' },
    { key: 'mission_image', value: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80' },
    { key: 'vision_image', value: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80' },
    { key: 'impact_lives', value: '10,000+' },
    { key: 'impact_children', value: '2,500+' },
    { key: 'impact_programs', value: '150+' },
    { key: 'impact_volunteers', value: '500+' },
    { key: 'contact_address', value: '[Foundation Address â€” To be provided by client]' },
    { key: 'contact_phone', value: '[Phone Number â€” To be provided by client]' },
    { key: 'contact_email', value: '[Email â€” To be provided by client]' },
    { key: 'contact_whatsapp', value: '[WhatsApp Number â€” To be provided by client]' },
    { key: 'social_facebook', value: '#' },
    { key: 'social_instagram', value: '#' },
    { key: 'social_twitter', value: '#' },
    { key: 'social_youtube', value: '#' },
    { key: 'social_linkedin', value: '#' },
    { key: 'donation_upi', value: '[UPI ID â€” To be provided by client]' },
    { key: 'donation_account', value: '[Bank Account â€” To be provided by client]' },
    { key: 'donation_80g', value: 'false' },
    { key: 'maps_embed', value: '' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  // Programs
  const programs = [
    {
      title: 'Education',
      slug: 'education',
      description: 'Providing quality education and learning opportunities to children in underserved communities through schools, tutoring centers, and scholarship programs.',
      content: 'Our Education program believes that every child deserves access to quality education regardless of their economic background. We operate learning centers, distribute educational materials, and provide scholarships to bright students who cannot afford school fees.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      category: 'Education',
      order: 1,
    },
    {
      title: 'Healthcare',
      slug: 'healthcare',
      description: 'Organizing medical camps, health awareness programs, and connecting communities with essential healthcare services.',
      content: 'Access to healthcare should not be a privilege. Our Healthcare program organizes regular medical camps, conducts health awareness workshops, and connects communities with medical professionals who volunteer their expertise.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
      category: 'Healthcare',
      order: 2,
    },
    {
      title: 'Women Empowerment',
      slug: 'women-empowerment',
      description: 'Supporting women through skill development, entrepreneurship training, and creating platforms for women to lead in their communities.',
      content: 'Empowering women is at the heart of community transformation. Our Women Empowerment program provides vocational training, microfinance support, and leadership development opportunities to women across rural and urban communities.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      category: 'Empowerment',
      order: 3,
    },
    {
      title: 'Community Development',
      slug: 'community-development',
      description: 'Building stronger communities through infrastructure support, civic engagement, and collaborative development initiatives.',
      content: 'Strong communities are built from within. Our Community Development program works alongside local leaders and residents to identify needs, co-design solutions, and implement sustainable development projects.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
      category: 'Community',
      order: 4,
    },
    {
      title: 'Food & Nutrition',
      slug: 'food-nutrition',
      description: 'Addressing food insecurity through nutrition programs, community kitchens, and food distribution drives for vulnerable families.',
      content: 'No one should go to sleep hungry. Our Food & Nutrition program operates community meal programs, distributes food packages to vulnerable families, and works to promote nutritional awareness in communities.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
      category: 'Community',
      order: 5,
    },
    {
      title: 'Environmental Sustainability',
      slug: 'environment',
      description: 'Promoting environmental awareness, tree plantation drives, and clean energy initiatives in partnership with local communities.',
      content: 'We live in the environment we protect. Our Environmental Sustainability program works with communities on tree plantation, waste management, and clean energy awareness â€” building a greener future for coming generations.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      category: 'Environment',
      order: 6,
    },
    {
      title: 'Skill Development',
      slug: 'skill-development',
      description: 'Equipping youth and adults with vocational skills and professional training to improve livelihood opportunities.',
      content: 'Skills open doors. Our Skill Development program provides vocational training in areas like tailoring, computer literacy, electrical work, and more â€” giving individuals the tools they need to earn a dignified livelihood.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      category: 'Empowerment',
      order: 7,
    },
    {
      title: 'Children Support',
      slug: 'children-support',
      description: 'Protecting and nurturing children through child welfare programs, nutrition support, and safe learning environments.',
      content: 'Children are the future. Our Children Support program provides nutrition, safe spaces for play and learning, mentorship, and protection to children who are most vulnerable in our communities.\n\n[Full program details to be provided by client]',
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      category: 'Education',
      order: 8,
    },
  ]

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program,
    })
  }

  // Events
  const now = new Date()
  const future1 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const future2 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
  const past1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const past2 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const events = [
    {
      title: 'Annual Health Camp 2024',
      slug: 'annual-health-camp-2024',
      description: 'A free medical camp providing health check-ups, dental screening, eye testing, and medicines to over 500 community members.',
      content: 'Our Annual Health Camp brings together volunteer doctors, nurses, and health workers to provide free medical services to communities with limited healthcare access. This year, we aim to serve over 500 individuals across multiple specialties.\n\n[Full event details to be provided by the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      date: future1,
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      location: '[Event Location â€” To be confirmed]',
      address: '[Full Address â€” To be confirmed]',
      status: 'published',
    },
    {
      title: 'Education Support Drive',
      slug: 'education-support-drive-2024',
      description: 'Distribution of school supplies, books, and educational materials to underprivileged students ahead of the new academic year.',
      content: 'As the new academic year approaches, we are organizing a drive to distribute school supplies â€” notebooks, stationery, school bags, and educational materials â€” to children who need it most.\n\n[Full event details to be provided by the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      date: future2,
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      location: '[Event Location â€” To be confirmed]',
      address: '[Full Address â€” To be confirmed]',
      status: 'published',
    },
    {
      title: 'Women Entrepreneurship Workshop',
      slug: 'women-entrepreneurship-workshop-2024',
      description: 'A skill-building workshop for women entrepreneurs, covering business fundamentals, finance management, and marketing.',
      content: 'This workshop is designed to equip women entrepreneurs with practical skills in business planning, financial management, and marketing strategies. Guest speakers include successful women business leaders from the community.\n\n[Full event details to be provided by the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      date: past1,
      startTime: '09:00 AM',
      endTime: '03:00 PM',
      location: '[Past Event Location]',
      address: '[Past Event Address]',
      status: 'completed',
    },
    {
      title: 'Tree Plantation Drive',
      slug: 'tree-plantation-drive-2024',
      description: 'Community-led tree plantation initiative planting 1,000 trees across local neighborhoods and schools.',
      content: 'In our commitment to a greener future, we organized a community tree plantation drive, planting over 1,000 saplings across local neighborhoods, schools, and public spaces. Volunteers of all ages came together to make this initiative a success.\n\n[Full event details to be provided by the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      date: past2,
      startTime: '07:00 AM',
      endTime: '12:00 PM',
      location: '[Past Event Location]',
      address: '[Past Event Address]',
      status: 'completed',
    },
  ]

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    })
  }

  // Impact Stories
  const stories = [
    {
      title: 'From Dropout to Scholar: Priya\'s Journey',
      slug: 'priya-journey-education',
      excerpt: 'When her family could no longer afford school fees, 12-year-old Priya was forced to leave school. The foundation\'s scholarship program changed everything.',
      content: 'Note: This is a representative story. Individual names and details have been changed or are placeholder content pending real stories from the foundation.\n\n---\n\nWhen her family could no longer afford school fees, 12-year-old Priya was forced to leave school. With five siblings and a father who had lost his job, education felt like an impossible luxury.\n\nThat\'s when our education team met Priya\'s family. Within weeks, she was enrolled in our scholarship program â€” covering her school fees, supplying her books, and pairing her with a mentor.\n\nToday, Priya is among the top students in her class and dreams of becoming a teacher herself.\n\n"Education is the one thing no one can take from you," she says.\n\n[This story slot is available for a real story from the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80',
      location: '[Location â€” To be provided by client]',
      status: 'published',
    },
    {
      title: 'A Kitchen That Feeds a Village',
      slug: 'community-kitchen-story',
      excerpt: 'When drought hit the region, hundreds of families faced food insecurity. Our community kitchen became a lifeline for an entire neighborhood.',
      content: 'Note: This is a representative story. Individual names and details are placeholder content pending real stories from the foundation.\n\n---\n\nThe monsoon failed that year. Fields dried up. Families who had farmed the same land for generations found themselves with nothing to harvest.\n\nOur foundation responded immediately. Within days, a community kitchen was set up â€” providing two warm meals a day to over 200 families in the region.\n\nVolunteers drove from the city every morning. Local women who had themselves benefited from our programs came forward to cook, manage, and serve.\n\nFor three months, not a single family went hungry.\n\n[This story slot is available for a real story from the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=80',
      location: '[Location â€” To be provided by client]',
      status: 'published',
    },
    {
      title: 'Lakshmi\'s Business, Her Family\'s Freedom',
      slug: 'lakshmi-women-empowerment',
      excerpt: 'A single mother of three, Lakshmi joined our women\'s tailoring program with nothing but determination. Today she runs her own shop.',
      content: 'Note: This is a representative story. Individual names and details are placeholder content pending real stories from the foundation.\n\n---\n\nLakshmi was 28 when she joined our women\'s vocational program. A single mother, she had never had a job â€” or the confidence that she could have one.\n\nOur tailoring program gave her both skill and sisterhood. She trained for four months alongside 15 other women, learning tailoring, basic accounting, and how to build a client base.\n\nSix months after completing the program, Lakshmi opened her own tailoring shop. She now employs two other women from the program.\n\n[This story slot is available for a real story from the foundation]',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
      location: '[Location â€” To be provided by client]',
      status: 'published',
    },
  ]

  for (const story of stories) {
    await prisma.impactStory.upsert({
      where: { slug: story.slug },
      update: {},
      create: story,
    })
  }

  // Gallery images
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', caption: 'Children in learning program', category: 'Education', altText: 'Children raising hands in a classroom' },
    { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', caption: 'Education outreach program', category: 'Education', altText: 'Students engaged in learning activity' },
    { url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', caption: 'Community health camp', category: 'Healthcare', altText: 'Volunteer doctor at health camp' },
    { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', caption: 'Medical screening drive', category: 'Healthcare', altText: 'Healthcare volunteers serving community' },
    { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', caption: 'Women skill development workshop', category: 'Volunteers', altText: 'Women learning vocational skills' },
    { url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80', caption: 'Volunteer orientation day', category: 'Volunteers', altText: 'Foundation volunteers gathered for orientation' },
    { url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', caption: 'Food distribution program', category: 'Community', altText: 'Volunteers distributing food to families' },
    { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80', caption: 'Tree plantation drive', category: 'Environment', altText: 'Community members planting trees' },
    { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', caption: 'Youth skill development training', category: 'Community', altText: 'Youth in vocational training session' },
    { url: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80', caption: 'Community gathering and outreach', category: 'Events', altText: 'Community members gathered at foundation event' },
    { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80', caption: 'Child education support', category: 'Education', altText: 'Child studying with foundation support' },
    { url: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=800&q=80', caption: 'Annual foundation event', category: 'Events', altText: 'Annual foundation gathering and program' },
  ]

  let order = 1
  for (const img of galleryImages) {
    await prisma.galleryImage.create({
      data: { ...img, order: order++ },
    }).catch(() => {})
  }

  console.log('âœ… Database seeded successfully!')
  console.log('ðŸ“§ Admin email: admin@Gudalafoundation.org')
  console.log('ðŸ”‘ Admin password: Admin@GFF2024')
  console.log('âš ï¸  Please change the admin password after first login.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
