-- Forward-only reconciliation of the committed initial migration with the application schema.
-- Reconciles initial-chain and inspected production drift; validate exact schema before release.
-- Idempotent object creation does not excuse incompatible existing definitions.
-- Legacy columns remain intact (ignored in Prisma); no customer records or prices are removed.
BEGIN;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "eyebrowEn" TEXT, ADD COLUMN IF NOT EXISTS "eyebrowSw" TEXT,
 ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT, ADD COLUMN IF NOT EXISTS "descriptionSw" TEXT,
 ADD COLUMN IF NOT EXISTS "featuresEn" JSONB, ADD COLUMN IF NOT EXISTS "featuresSw" JSONB;
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema=current_schema() AND table_name='Service' AND column_name='summaryEn') THEN
  UPDATE "Service" SET "descriptionEn"=COALESCE("descriptionEn","summaryEn"), "descriptionSw"=COALESCE("descriptionSw","summarySw");
 END IF;
END $$;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "specifications" JSONB;
ALTER TABLE "CctvPackage" ADD COLUMN IF NOT EXISTS "cameras" INTEGER, ADD COLUMN IF NOT EXISTS "includedItems" JSONB;
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema=current_schema() AND table_name='CctvPackage' AND column_name='cameraCount') THEN
  UPDATE "CctvPackage" SET "cameras"="cameraCount" WHERE "cameras" IS NULL;
  ALTER TABLE "CctvPackage" ALTER COLUMN "cameraCount" DROP NOT NULL;
 END IF;
END $$;
ALTER TABLE "CctvPackage" ALTER COLUMN "cameras" SET NOT NULL;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "slug" TEXT, ADD COLUMN IF NOT EXISTS "category" TEXT;
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema=current_schema() AND table_name='Project' AND column_name='serviceType') THEN
  UPDATE "Project" SET "category"=COALESCE("category","serviceType",'Uncategorized');
 ELSE
  UPDATE "Project" SET "category"='Uncategorized' WHERE "category" IS NULL;
 END IF;
END $$;
UPDATE "Project" SET "slug"='legacy-' || "id" WHERE "slug" IS NULL;
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL, ALTER COLUMN "category" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");
ALTER TABLE "SupportArticle" ADD COLUMN IF NOT EXISTS "categoryEn" TEXT, ADD COLUMN IF NOT EXISTS "categorySw" TEXT,
 ADD COLUMN IF NOT EXISTS "summaryEn" TEXT, ADD COLUMN IF NOT EXISTS "summarySw" TEXT;
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema=current_schema() AND table_name='SupportArticle' AND column_name='category') THEN
  UPDATE "SupportArticle" SET "categoryEn"=COALESCE("categoryEn","category",'Uncategorized');
 ELSE
  UPDATE "SupportArticle" SET "categoryEn"='Uncategorized' WHERE "categoryEn" IS NULL;
 END IF;
END $$;
ALTER TABLE "SupportArticle" ALTER COLUMN "categoryEn" SET NOT NULL, ALTER COLUMN "contentEn" DROP NOT NULL;
ALTER TABLE "SiteSurveyRequest" ADD COLUMN IF NOT EXISTS "budgetRange" TEXT, ADD COLUMN IF NOT EXISTS "urgency" TEXT,
 ADD COLUMN IF NOT EXISTS "preferredContactMethod" TEXT, ADD COLUMN IF NOT EXISTS "selectedPackage" TEXT, ADD COLUMN IF NOT EXISTS "selectedProduct" TEXT;

CREATE TABLE IF NOT EXISTS "AdminOtp" (
 "id" TEXT NOT NULL PRIMARY KEY, "phone" TEXT NOT NULL, "otpHash" TEXT NOT NULL,
 "expiresAt" TIMESTAMP(3) NOT NULL, "usedAt" TIMESTAMP(3), "attempts" INTEGER NOT NULL DEFAULT 0,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "AdminOtp_phone_idx" ON "AdminOtp"("phone");
CREATE INDEX IF NOT EXISTS "AdminOtp_expiresAt_idx" ON "AdminOtp"("expiresAt");
CREATE TABLE IF NOT EXISTS "AdminSession" (
 "id" TEXT NOT NULL PRIMARY KEY, "phone" TEXT NOT NULL, "sessionHash" TEXT NOT NULL,
 "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "AdminSession_sessionHash_key" ON "AdminSession"("sessionHash");
CREATE INDEX IF NOT EXISTS "AdminSession_phone_idx" ON "AdminSession"("phone");
CREATE INDEX IF NOT EXISTS "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");
CREATE TABLE IF NOT EXISTS "EnquirySubmission" (
 "id" TEXT NOT NULL PRIMARY KEY, "fingerprint" TEXT NOT NULL, "senderHash" TEXT NOT NULL,
 "kind" TEXT NOT NULL, "recordId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "EnquirySubmission_createdAt_idx" ON "EnquirySubmission"("createdAt");
CREATE INDEX IF NOT EXISTS "EnquirySubmission_fingerprint_createdAt_idx" ON "EnquirySubmission"("fingerprint","createdAt");
CREATE INDEX IF NOT EXISTS "EnquirySubmission_senderHash_createdAt_idx" ON "EnquirySubmission"("senderHash","createdAt");
COMMIT;

