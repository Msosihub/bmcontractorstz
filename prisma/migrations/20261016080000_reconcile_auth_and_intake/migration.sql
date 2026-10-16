-- Forward-only reconciliation of the committed initial migration with the application schema.
-- Release gate: compare actual production tables/history first. Never apply blindly.
-- Legacy columns remain intact (ignored in Prisma); no customer records or prices are removed.
BEGIN;
ALTER TABLE "Service" ADD COLUMN "eyebrowEn" TEXT, ADD COLUMN "eyebrowSw" TEXT,
 ADD COLUMN "descriptionEn" TEXT, ADD COLUMN "descriptionSw" TEXT,
 ADD COLUMN "featuresEn" JSONB, ADD COLUMN "featuresSw" JSONB;
UPDATE "Service" SET "descriptionEn" = "summaryEn", "descriptionSw" = "summarySw";
ALTER TABLE "Product" ADD COLUMN "specifications" JSONB;
ALTER TABLE "CctvPackage" ADD COLUMN "cameras" INTEGER, ADD COLUMN "includedItems" JSONB;
UPDATE "CctvPackage" SET "cameras" = "cameraCount";
ALTER TABLE "CctvPackage" ALTER COLUMN "cameras" SET NOT NULL, ALTER COLUMN "cameraCount" DROP NOT NULL;
ALTER TABLE "Project" ADD COLUMN "slug" TEXT, ADD COLUMN "category" TEXT;
UPDATE "Project" SET "slug" = 'legacy-' || "id", "category" = COALESCE("serviceType", 'Uncategorized');
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL, ALTER COLUMN "category" SET NOT NULL;
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
ALTER TABLE "SupportArticle" ADD COLUMN "categoryEn" TEXT, ADD COLUMN "categorySw" TEXT,
 ADD COLUMN "summaryEn" TEXT, ADD COLUMN "summarySw" TEXT;
UPDATE "SupportArticle" SET "categoryEn" = COALESCE("category", 'Uncategorized');
ALTER TABLE "SupportArticle" ALTER COLUMN "categoryEn" SET NOT NULL, ALTER COLUMN "contentEn" DROP NOT NULL;
ALTER TABLE "SiteSurveyRequest" ADD COLUMN "budgetRange" TEXT, ADD COLUMN "urgency" TEXT,
 ADD COLUMN "preferredContactMethod" TEXT, ADD COLUMN "selectedPackage" TEXT, ADD COLUMN "selectedProduct" TEXT;

CREATE TABLE "AdminOtp" (
 "id" TEXT NOT NULL PRIMARY KEY, "phone" TEXT NOT NULL, "otpHash" TEXT NOT NULL,
 "expiresAt" TIMESTAMP(3) NOT NULL, "usedAt" TIMESTAMP(3), "attempts" INTEGER NOT NULL DEFAULT 0,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "AdminOtp_phone_idx" ON "AdminOtp"("phone");
CREATE INDEX "AdminOtp_expiresAt_idx" ON "AdminOtp"("expiresAt");
CREATE TABLE "AdminSession" (
 "id" TEXT NOT NULL PRIMARY KEY, "phone" TEXT NOT NULL, "sessionHash" TEXT NOT NULL,
 "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "AdminSession_sessionHash_key" ON "AdminSession"("sessionHash");
CREATE INDEX "AdminSession_phone_idx" ON "AdminSession"("phone");
CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");
CREATE TABLE "EnquirySubmission" (
 "id" TEXT NOT NULL PRIMARY KEY, "fingerprint" TEXT NOT NULL, "senderHash" TEXT NOT NULL,
 "kind" TEXT NOT NULL, "recordId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "EnquirySubmission_fingerprint_createdAt_idx" ON "EnquirySubmission"("fingerprint","createdAt");
CREATE INDEX "EnquirySubmission_senderHash_createdAt_idx" ON "EnquirySubmission"("senderHash","createdAt");
COMMIT;

