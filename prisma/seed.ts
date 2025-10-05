import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@amanarcarbon.com' },
    update: {},
    create: {
      email: 'admin@amanarcarbon.com',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          password: adminPassword,
          isVerified: true,
          bio: 'Platform Administrator',
          location: 'Global'
        }
      }
    }
  })

  // Create sample organization
  const organization = await prisma.organization.upsert({
    where: { id: 'sample-org-1' },
    update: {},
    create: {
      id: 'sample-org-1',
      name: 'Green Future Foundation',
      description: 'Leading environmental organization focused on carbon reduction',
      website: 'https://greenfuture.org',
      type: 'NGO',
      size: 'LARGE',
      industry: 'Environmental',
      location: 'San Francisco, CA',
      isVerified: true
    }
  })

  // Create sample business user
  const businessPassword = await bcrypt.hash('business123', 12)
  const businessUser = await prisma.user.upsert({
    where: { email: 'business@greenfuture.org' },
    update: {},
    create: {
      email: 'business@greenfuture.org',
      name: 'Business User',
      role: 'BUSINESS',
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: 'Business',
          lastName: 'User',
          password: businessPassword,
          isVerified: true,
          bio: 'Environmental Project Manager',
          location: 'San Francisco, CA'
        }
      }
    }
  })

  // Add business user to organization
  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: businessUser.id
      }
    },
    update: {},
    create: {
      organizationId: organization.id,
      userId: businessUser.id,
      role: 'ADMIN'
    }
  })

  // Create sample carbon projects
  const projects = [
    {
      id: 'project-1',
      title: 'Amazon Rainforest Reforestation',
      description: 'Large-scale reforestation project in the Amazon basin to restore degraded lands and sequester carbon dioxide. This project covers 10,000 hectares and will plant over 2 million native tree species.',
      location: 'Amazon Basin, Brazil',
      country: 'Brazil',
      projectType: 'REFORESTATION',
      standard: 'VCS',
      methodology: 'VM0007 - Methodology for Afforestation, Reforestation and Revegetation',
      estimatedCredits: 50000,
      pricePerCredit: 15.50,
      status: 'VERIFIED',
      isActive: true,
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e'],
      startDate: new Date('2023-01-01'),
      endDate: new Date('2033-12-31'),
      verificationDate: new Date('2023-06-15'),
      ownerId: businessUser.id,
      organizationId: organization.id
    },
    {
      id: 'project-2',
      title: 'Solar Farm Development - India',
      description: 'Development of a 100MW solar farm in Rajasthan, India, to provide clean energy and reduce carbon emissions. This project will generate 200,000 MWh of clean electricity annually.',
      location: 'Rajasthan, India',
      country: 'India',
      projectType: 'RENEWABLE_ENERGY',
      standard: 'GOLD_STANDARD',
      methodology: 'GS-VER-1.0 - Grid Connected Renewable Electricity',
      estimatedCredits: 75000,
      pricePerCredit: 12.00,
      status: 'VERIFIED',
      isActive: true,
      images: ['https://images.unsplash.com/photo-1509391366360-2e9590a79c47'],
      startDate: new Date('2023-03-01'),
      endDate: new Date('2033-02-28'),
      verificationDate: new Date('2023-08-20'),
      ownerId: businessUser.id,
      organizationId: organization.id
    },
    {
      id: 'project-3',
      title: 'Blue Carbon Mangrove Restoration',
      description: 'Restoration of mangrove ecosystems in coastal areas to enhance blue carbon sequestration. This project focuses on 5,000 hectares of degraded mangrove areas in Southeast Asia.',
      location: 'Southeast Asia',
      country: 'Indonesia',
      projectType: 'BLUE_CARBON',
      standard: 'VCS',
      methodology: 'VM0033 - Methodology for Tidal Wetland and Seagrass Restoration',
      estimatedCredits: 30000,
      pricePerCredit: 18.75,
      status: 'UNDER_REVIEW',
      isActive: true,
      images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5'],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2034-12-31'),
      ownerId: businessUser.id,
      organizationId: organization.id
    }
  ]

  for (const projectData of projects) {
    const project = await prisma.carbonProject.upsert({
      where: { id: projectData.id },
      update: {},
      create: projectData
    })

    // Create carbon credits for each project
    const creditsPerBatch = 100
    const totalBatches = Math.ceil(projectData.estimatedCredits / creditsPerBatch)

    for (let batch = 0; batch < totalBatches; batch++) {
      const batchSize = Math.min(creditsPerBatch, projectData.estimatedCredits - (batch * creditsPerBatch))
      
      for (let i = 0; i < batchSize; i++) {
        await prisma.carbonCredit.create({
          data: {
            projectId: project.id,
            serialNumber: `${project.id}-${batch + 1}-${i + 1}`,
            vintage: new Date().getFullYear(),
            quantity: 1,
            price: projectData.pricePerCredit,
            status: 'AVAILABLE'
          }
        })
      }
    }
  }

  // Create sample individual user
  const individualPassword = await bcrypt.hash('user123', 12)
  const individualUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      role: 'INDIVIDUAL',
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          password: individualPassword,
          isVerified: true,
          bio: 'Environmental enthusiast and carbon offset buyer',
          location: 'New York, NY',
          carbonFootprint: 12.5,
          totalOffset: 5.2
        }
      }
    }
  })

  // Create sample transactions
  const transactions = [
    {
      userId: individualUser.id,
      projectId: 'project-1',
      amount: 10,
      pricePerCredit: 15.50,
      totalAmount: 155.00,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'card',
      stripePaymentId: 'pi_sample_1',
      createdAt: new Date('2024-01-15')
    },
    {
      userId: individualUser.id,
      projectId: 'project-2',
      amount: 5,
      pricePerCredit: 12.00,
      totalAmount: 60.00,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'card',
      stripePaymentId: 'pi_sample_2',
      createdAt: new Date('2024-02-20')
    }
  ]

  for (const transactionData of transactions) {
    await prisma.transaction.create({
      data: transactionData
    })
  }

  // Create sample user impacts
  const impacts = [
    {
      userId: individualUser.id,
      impactType: 'CARBON_OFFSET',
      value: 10,
      unit: 'credits',
      description: 'Carbon offset purchase from Amazon Rainforest Reforestation',
      projectId: 'project-1',
      verified: true,
      createdAt: new Date('2024-01-15')
    },
    {
      userId: individualUser.id,
      impactType: 'CARBON_OFFSET',
      value: 5,
      unit: 'credits',
      description: 'Carbon offset purchase from Solar Farm Development',
      projectId: 'project-2',
      verified: true,
      createdAt: new Date('2024-02-20')
    }
  ]

  for (const impactData of impacts) {
    await prisma.userImpact.create({
      data: impactData
    })
  }

  // Create sample community posts
  const posts = [
    {
      userId: individualUser.id,
      title: 'My Carbon Neutral Journey',
      content: 'I\'ve been working on reducing my carbon footprint for the past year. Through the AmanarCarbon platform, I\'ve been able to track my emissions and purchase high-quality carbon offsets. It\'s amazing to see the impact!',
      type: 'SUCCESS_STORY',
      tags: ['carbon-neutral', 'sustainability', 'personal-journey'],
      likes: 15,
      comments: 3
    },
    {
      userId: businessUser.id,
      title: 'New Reforestation Project Update',
      content: 'Exciting news! Our Amazon Rainforest reforestation project has reached 50% completion. We\'ve planted over 1 million trees and the local ecosystem is already showing signs of recovery.',
      type: 'PROJECT_UPDATE',
      tags: ['reforestation', 'amazon', 'project-update'],
      likes: 42,
      comments: 8
    }
  ]

  for (const postData of posts) {
    await prisma.communityPost.create({
      data: postData
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log('👤 Admin user: admin@amanarcarbon.com / admin123')
  console.log('🏢 Business user: business@greenfuture.org / business123')
  console.log('👤 Individual user: user@example.com / user123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
