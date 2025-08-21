// // // // import { Pinecone } from "@pinecone-database/pinecone";
// // // // import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
// // // // import dotenv from "dotenv";
// // // //
// // // // dotenv.config();
// // // //
// // // // // --- Pinecone setup ---
// // // // const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// // // // const indexName = "product-catalog-index";
// // // // let index;
// // // //
// // // // // Ensure index exists
// // // // async function ensureIndex() {
// // // //     const existingIndexes = await pc.listIndexes();
// // // //     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
// // // //         await pc.createIndex({
// // // //             name: indexName,
// // // //             dimension: 768,
// // // //             metric: "dotproduct",
// // // //             spec: { serverless: { cloud: "aws", region: "us-east-1" } },
// // // //         });
// // // //
// // // //         // Wait until ready
// // // //         let ready = false;
// // // //         while (!ready) {
// // // //             const desc = await pc.describeIndex(indexName);
// // // //             ready = desc.status.ready;
// // // //             if (!ready) await new Promise((r) => setTimeout(r, 1000));
// // // //         }
// // // //     }
// // // //     index = pc.Index(indexName);
// // // // }
// // // // await ensureIndex();
// // // //
// // // // // --- Embedding model ---
// // // // const embedModel = new GoogleGenerativeAIEmbeddings({
// // // //     model: "models/embedding-001",
// // // //     apiKey: process.env.GOOGLE_API_KEY,
// // // // });
// // // //
// // // // // --- LLM model (Gemini) ---
// // // // const llm = new ChatGoogleGenerativeAI({
// // // //     model: "gemini-1.5-flash", // fast + cheap, or use gemini-pro
// // // //     apiKey: process.env.GOOGLE_API_KEY,
// // // //     temperature: 0.3,
// // // // });
// // // //
// // // // // --- Utility: Sync JSON with Pinecone ---
// // // // async function syncWithPinecone(docs) {
// // // //     const ids = docs.map((d) => d[0]);
// // // //     const texts = docs.map((d) => d[1]);
// // // //     const metadatas = docs.map((d) => d[2]);
// // // //     const embeddings = await embedModel.embedDocuments(texts);
// // // //
// // // //     const vectors = embeddings.map((embedding, i) => ({
// // // //         id: ids[i],
// // // //         values: embedding,
// // // //         metadata: metadatas[i],
// // // //     }));
// // // //
// // // //     await index.upsert({
// // // //         vectors,
// // // //         namespace: "default",
// // // //     });
// // // //
// // // //     return { message: `Upserted ${vectors.length} vectors into Pinecone ✅` };
// // // // }
// // // //
// // // // // --- Routes ---
// // // //
// // // // // 1. Upload JSON Data
// // // // export const syncJSON = async (req, res) => {
// // // //     try {
// // // //         const raw = req.body; // expects JSON array
// // // //         const docs = raw.map((item, i) => {
// // // //             const docId = String(item.id || i);
// // // //             const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;
// // // //             const metadata = { ...item, source: "json" };
// // // //             delete metadata.id;
// // // //             delete metadata.title;
// // // //             delete metadata.summary;
// // // //             delete metadata.content;
// // // //             return [docId, text.trim(), metadata];
// // // //         });
// // // //         const result = await syncWithPinecone(docs);
// // // //         res.json(result);
// // // //     } catch (err) {
// // // //         res.status(500).json({ error: err.message });
// // // //     }
// // // // };
// // // //
// // // // // 2. Query endpoint
// // // // export const promptJSON = async (req, res) => {
// // // //     try {
// // // //         const { query, topK = 3 } = req.body;
// // // //         const embedding = await embedModel.embedQuery(query);
// // // //
// // // //         const result = await index.query({
// // // //             vector: embedding,
// // // //             topK,
// // // //             includeMetadata: true,
// // // //             namespace: "default",   // ✅ fixed
// // // //         });
// // // //
// // // //         if (!result.matches || result.matches.length === 0) {
// // // //             return res.json({ answer: "Sorry, I couldn’t find an answer to your question." });
// // // //         }
// // // //
// // // //         // Build context
// // // //         const context = result.matches
// // // //             .map((m) => `Q: ${m.metadata?.title}\nA: ${m.metadata?.content}`)
// // // //             .join("\n\n");
// // // //
// // // //         // Ask Gemini
// // // //         const prompt = `User asked: "${query}"\n\nHere are some FAQ entries:\n${context}\n\nPlease provide the best possible answer based on these FAQs.`;
// // // //
// // // //         const response = await llm.invoke(prompt);
// // // //
// // // //         res.json({
// // // //             answer: typeof response.content === "string"
// // // //                 ? response.content
// // // //                 : response.content[0]?.text,   // ✅ safer
// // // //             sources: result.matches.map((m) => ({
// // // //                 id: m.id,
// // // //                 title: m.metadata?.title,
// // // //                 category: m.metadata?.category,
// // // //                 score: m.score,
// // // //             })),
// // // //         });
// // // //     } catch (err) {
// // // //         console.error(err);
// // // //         res.status(500).json({ error: err.message });
// // // //     }
// // // // };
// // //
// // // import { Pinecone } from "@pinecone-database/pinecone";
// // // import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
// // // import dotenv from "dotenv";
// // //
// // // dotenv.config();
// // //
// // // // --- Pinecone setup ---
// // // const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// // // const indexName = "product-catalog-index";
// // // let index;
// // //
// // // // Ensure index exists
// // // async function ensureIndex() {
// // //     const existingIndexes = await pc.listIndexes();
// // //     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
// // //         await pc.createIndex({
// // //             name: indexName,
// // //             dimension: 768,
// // //             metric: "dotproduct",
// // //             spec: { serverless: { cloud: "aws", region: "us-east-1" } },
// // //         });
// // //
// // //         // Wait until ready
// // //         let ready = false;
// // //         while (!ready) {
// // //             const desc = await pc.describeIndex(indexName);
// // //             ready = desc.status.ready;
// // //             if (!ready) await new Promise((r) => setTimeout(r, 1000));
// // //         }
// // //     }
// // //     index = pc.Index(indexName);
// // // }
// // // await ensureIndex();
// // //
// // // // --- Embedding model ---
// // // const embedModel = new GoogleGenerativeAIEmbeddings({
// // //     model: "models/embedding-001",
// // //     apiKey: process.env.GOOGLE_API_KEY,
// // // });
// // //
// // // // --- LLM model (Gemini) ---
// // // const llm = new ChatGoogleGenerativeAI({
// // //     model: "gemini-1.5-flash", // fast + cheap, or use gemini-pro
// // //     apiKey: process.env.GOOGLE_API_KEY,
// // //     temperature: 0.3,
// // // });
// // //
// // // // --- Utility: Sync JSON with Pinecone ---
// // // async function syncWithPinecone(docs) {
// // //     const ids = docs.map((d) => d[0]);
// // //     const texts = docs.map((d) => d[1]);
// // //     const metadatas = docs.map((d) => d[2]);
// // //     const embeddings = await embedModel.embedDocuments(texts);
// // //
// // //     const vectors = embeddings.map((embedding, i) => ({
// // //         id: ids[i],
// // //         values: embedding,
// // //         metadata: metadatas[i],
// // //     }));
// // //
// // //     // For upsert, you can still use namespace if needed
// // //     await index.upsert({
// // //         vectors,
// // //         namespace: "default",
// // //     });
// // //
// // //     return { message: `Upserted ${vectors.length} vectors into Pinecone ✅` };
// // // }
// // //
// // // // --- Routes ---
// // //
// // // // 1. Upload JSON Data
// // // export const syncJSON = async (req, res) => {
// // //     try {
// // //         const raw = req.body; // expects JSON array
// // //         const docs = raw.map((item, i) => {
// // //             const docId = String(item.id || i);
// // //             const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;
// // //             const metadata = { ...item, source: "json" };
// // //             delete metadata.id;
// // //             delete metadata.title;
// // //             delete metadata.summary;
// // //             delete metadata.content;
// // //             return [docId, text.trim(), metadata];
// // //         });
// // //         const result = await syncWithPinecone(docs);
// // //         res.json(result);
// // //     } catch (err) {
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // };
// // //
// // // // 2. Query endpoint - FIXED
// // // export const promptJSON = async (req, res) => {
// // //     try {
// // //         const { query, topK = 3 } = req.body;
// // //         const embedding = await embedModel.embedQuery(query);
// // //
// // //         // Method 1: Query the default namespace directly
// // //         const result = await index.query({
// // //             vector: embedding,
// // //             topK,
// // //             includeMetadata: true,
// // //             // Remove namespace from here - it's not valid for query()
// // //         });
// // //
// // //         // Alternative Method 2: If you need to work with namespaces, use:
// // //         // const namespacedIndex = index.namespace("default");
// // //         // const result = await namespacedIndex.query({
// // //         //     vector: embedding,
// // //         //     topK,
// // //         //     includeMetadata: true,
// // //         // });
// // //
// // //         if (!result.matches || result.matches.length === 0) {
// // //             return res.json({ answer: "Sorry, I couldn't find an answer to your question." });
// // //         }
// // //
// // //         // Build context
// // //         const context = result.matches
// // //             .map((m) => `Q: ${m.metadata?.title}\nA: ${m.metadata?.content}`)
// // //             .join("\n\n");
// // //
// // //         // Ask Gemini
// // //         const prompt = `User asked: "${query}"\n\nHere are some FAQ entries:\n${context}\n\nPlease provide the best possible answer based on these FAQs.`;
// // //
// // //         const response = await llm.invoke(prompt);
// // //
// // //         res.json({
// // //             answer: typeof response.content === "string"
// // //                 ? response.content
// // //                 : response.content[0]?.text,
// // //             sources: result.matches.map((m) => ({
// // //                 id: m.id,
// // //                 title: m.metadata?.title,
// // //                 category: m.metadata?.category,
// // //                 score: m.score,
// // //             })),
// // //         });
// // //     } catch (err) {
// // //         console.error(err);
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // };
// // import { Pinecone } from "@pinecone-database/pinecone";
// // import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
// // import dotenv from "dotenv";
// //
// // dotenv.config();
// //
// // // --- Pinecone setup ---
// // const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// // const indexName = "product-catalog-index";
// // let index;
// //
// // // Ensure index exists
// // async function ensureIndex() {
// //     const existingIndexes = await pc.listIndexes();
// //     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
// //         await pc.createIndex({
// //             name: indexName,
// //             dimension: 768,
// //             metric: "dotproduct",
// //             spec: { serverless: { cloud: "aws", region: "us-east-1" } },
// //         });
// //
// //         // Wait until ready
// //         let ready = false;
// //         while (!ready) {
// //             const desc = await pc.describeIndex(indexName);
// //             ready = desc.status.ready;
// //             if (!ready) await new Promise((r) => setTimeout(r, 1000));
// //         }
// //     }
// //     index = pc.Index(indexName);
// // }
// // await ensureIndex();
// //
// // // --- Embedding model ---
// // const embedModel = new GoogleGenerativeAIEmbeddings({
// //     model: "models/embedding-001",
// //     apiKey: process.env.GOOGLE_API_KEY,
// // });
// //
// // // --- LLM model (Gemini) ---
// // const llm = new ChatGoogleGenerativeAI({
// //     model: "gemini-1.5-flash", // fast + cheap, or use gemini-pro
// //     apiKey: process.env.GOOGLE_API_KEY,
// //     temperature: 0.3,
// // });
// //
// // // --- Utility: Sync JSON with Pinecone ---
// // async function syncWithPinecone(docs) {
// //     const ids = docs.map((d) => d[0]);
// //     const texts = docs.map((d) => d[1]);
// //     const metadatas = docs.map((d) => d[2]);
// //     const embeddings = await embedModel.embedDocuments(texts);
// //
// //     const vectors = embeddings.map((embedding, i) => ({
// //         id: ids[i],
// //         values: embedding,
// //         metadata: metadatas[i],
// //     }));
// //
// //     // For upsert, you can still use namespace if needed
// //     await index.upsert({
// //         vectors,
// //         namespace: "default",
// //     });
// //
// //     return { message: `Upserted ${vectors.length} vectors into Pinecone ✅` };
// // }
// //
// // // --- Routes ---
// //
// // // 1. Upload JSON Data
// // export const syncJSON = async (req, res) => {
// //     try {
// //         const raw = req.body; // expects JSON array
// //
// //         // Validate input
// //         if (!raw) {
// //             return res.status(400).json({ error: "Request body is required" });
// //         }
// //
// //         // Handle different input formats
// //         let records;
// //         if (Array.isArray(raw)) {
// //             records = raw;
// //         } else if (raw.data && Array.isArray(raw.data)) {
// //             records = raw.data;
// //         } else if (raw.records && Array.isArray(raw.records)) {
// //             records = raw.records;
// //         } else if (typeof raw === 'object') {
// //             // If it's a single object, wrap it in an array
// //             records = [raw];
// //         } else {
// //             return res.status(400).json({
// //                 error: "Invalid input format. Expected an array of objects or an object with 'data' or 'records' property containing an array."
// //             });
// //         }
// //
// //         if (records.length === 0) {
// //             return res.status(400).json({ error: "No records found to process" });
// //         }
// //
// //         console.log(`Processing ${records.length} records...`);
// //
// //         const docs = records.map((item, i) => {
// //             const docId = String(item.id || i);
// //             const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;
// //             const metadata = { ...item, source: "json" };
// //             delete metadata.id;
// //             delete metadata.title;
// //             delete metadata.summary;
// //             delete metadata.content;
// //             return [docId, text.trim(), metadata];
// //         });
// //
// //         const result = await syncWithPinecone(docs);
// //         res.json(result);
// //     } catch (err) {
// //         console.error("Error in syncJSON:", err);
// //         res.status(500).json({ error: err.message });
// //     }
// // };
// //
// // // 2. Query endpoint - FIXED
// // export const promptJSON = async (req, res) => {
// //     try {
// //         const { query, topK = 3 } = req.body;
// //         const embedding = await embedModel.embedQuery(query);
// //
// //         // Method 1: Query the default namespace directly
// //         const result = await index.query({
// //             vector: embedding,
// //             topK,
// //             includeMetadata: true,
// //             // Remove namespace from here - it's not valid for query()
// //         });
// //
// //         // Alternative Method 2: If you need to work with namespaces, use:
// //         // const namespacedIndex = index.namespace("default");
// //         // const result = await namespacedIndex.query({
// //         //     vector: embedding,
// //         //     topK,
// //         //     includeMetadata: true,
// //         // });
// //
// //         if (!result.matches || result.matches.length === 0) {
// //             return res.json({ answer: "Sorry, I couldn't find an answer to your question." });
// //         }
// //
// //         // Build context
// //         const context = result.matches
// //             .map((m) => `Q: ${m.metadata?.title}\nA: ${m.metadata?.content}`)
// //             .join("\n\n");
// //
// //         // Ask Gemini
// //         const prompt = `User asked: "${query}"\n\nHere are some FAQ entries:\n${context}\n\nPlease provide the best possible answer based on these FAQs.`;
// //
// //         const response = await llm.invoke(prompt);
// //
// //         res.json({
// //             answer: typeof response.content === "string"
// //                 ? response.content
// //                 : response.content[0]?.text,
// //             sources: result.matches.map((m) => ({
// //                 id: m.id,
// //                 title: m.metadata?.title,
// //                 category: m.metadata?.category,
// //                 score: m.score,
// //             })),
// //         });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: err.message });
// //     }
// // };
// import { Pinecone } from "@pinecone-database/pinecone";
// import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import dotenv from "dotenv";
//
// dotenv.config();
//
// // --- Pinecone setup ---
// const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const indexName = "product-catalog-index";
// let index;
//
// // Ensure index exists
// async function ensureIndex() {
//     const existingIndexes = await pc.listIndexes();
//     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
//         await pc.createIndex({
//             name: indexName,
//             dimension: 768,
//             metric: "dotproduct",
//             spec: { serverless: { cloud: "aws", region: "us-east-1" } },
//         });
//
//         // Wait until ready
//         let ready = false;
//         while (!ready) {
//             const desc = await pc.describeIndex(indexName);
//             ready = desc.status.ready;
//             if (!ready) await new Promise((r) => setTimeout(r, 1000));
//         }
//     }
//     index = pc.Index(indexName);
// }
// await ensureIndex();
//
// // --- Embedding model ---
// const embedModel = new GoogleGenerativeAIEmbeddings({
//     model: "models/embedding-001",
//     apiKey: process.env.GOOGLE_API_KEY,
// });
//
// // --- LLM model (Gemini) ---
// const llm = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-flash", // fast + cheap, or use gemini-pro
//     apiKey: process.env.GOOGLE_API_KEY,
//     temperature: 0.3,
// });
//
// // --- Utility: Sync JSON with Pinecone ---
// async function syncWithPinecone(docs) {
//     try {
//         if (!docs || !Array.isArray(docs) || docs.length === 0) {
//             throw new Error("No documents provided for syncing");
//         }
//
//         console.log(`Syncing ${docs.length} documents...`);
//
//         const ids = docs.map((d) => d[0]);
//         const texts = docs.map((d) => d[1]);
//         const metadatas = docs.map((d) => d[2]);
//
//         // Filter out empty texts
//         const validDocs = texts.map((text, i) => ({ text, id: ids[i], metadata: metadatas[i] }))
//             .filter(doc => doc.text && doc.text.trim().length > 0);
//
//         if (validDocs.length === 0) {
//             throw new Error("No valid documents with text content found");
//         }
//
//         console.log(`Processing ${validDocs.length} valid documents...`);
//
//         // Get embeddings for valid texts
//         const validTexts = validDocs.map(doc => doc.text);
//         const embeddings = await embedModel.embedDocuments(validTexts);
//
//         console.log(`Generated ${embeddings.length} embeddings`);
//
//         // Create vectors array with proper structure
//         const vectors = embeddings.map((embedding, i) => ({
//             id: String(validDocs[i].id), // Ensure ID is string
//             values: embedding,
//             metadata: validDocs[i].metadata || {},
//         }));
//
//         // Validate vectors before upserting
//         for (let i = 0; i < vectors.length; i++) {
//             const vector = vectors[i];
//             if (!vector.id || !Array.isArray(vector.values) || vector.values.length === 0) {
//                 console.error(`Invalid vector at index ${i}:`, vector);
//                 throw new Error(`Invalid vector structure at index ${i}`);
//             }
//         }
//
//         console.log(`Upserting ${vectors.length} vectors to Pinecone...`);
//
//         // Use the correct upsert format for newer Pinecone SDK
//         await index.upsert(vectors);
//
//         console.log("Successfully upserted vectors to Pinecone");
//
//         return { message: `Upserted ${vectors.length} vectors into Pinecone ✅` };
//     } catch (error) {
//         console.error("Error in syncWithPinecone:", error);
//         throw error;
//     }
// }
//
// // --- Routes ---
//
// // 1. Upload JSON Data
// export const syncJSON = async (req, res) => {
//     try {
//         const raw = req.body; // expects JSON array
//
//         // Validate input
//         if (!raw) {
//             return res.status(400).json({ error: "Request body is required" });
//         }
//
//         // Handle different input formats
//         let records;
//         if (Array.isArray(raw)) {
//             records = raw;
//         } else if (raw.data && Array.isArray(raw.data)) {
//             records = raw.data;
//         } else if (raw.records && Array.isArray(raw.records)) {
//             records = raw.records;
//         } else if (typeof raw === 'object') {
//             // If it's a single object, wrap it in an array
//             records = [raw];
//         } else {
//             return res.status(400).json({
//                 error: "Invalid input format. Expected an array of objects or an object with 'data' or 'records' property containing an array."
//             });
//         }
//
//         if (records.length === 0) {
//             return res.status(400).json({ error: "No records found to process" });
//         }
//
//         console.log(`Processing ${records.length} records...`);
//
//         const docs = records.map((item, i) => {
//             const docId = String(item.id || i);
//             const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;
//             const metadata = { ...item, source: "json" };
//             delete metadata.id;
//             delete metadata.title;
//             delete metadata.summary;
//             delete metadata.content;
//             return [docId, text.trim(), metadata];
//         });
//
//         const result = await syncWithPinecone(docs);
//         res.json(result);
//     } catch (err) {
//         console.error("Error in syncJSON:", err);
//         res.status(500).json({ error: err.message });
//     }
// };
//
// // 2. Query endpoint - FIXED
// export const promptJSON = async (req, res) => {
//     try {
//         const { query, topK = 3 } = req.body;
//         const embedding = await embedModel.embedQuery(query);
//
//         // Method 1: Query the default namespace directly
//         const result = await index.query({
//             vector: embedding,
//             topK,
//             includeMetadata: true,
//             // Remove namespace from here - it's not valid for query()
//         });
//
//         // Alternative Method 2: If you need to work with namespaces, use:
//         // const namespacedIndex = index.namespace("default");
//         // const result = await namespacedIndex.query({
//         //     vector: embedding,
//         //     topK,
//         //     includeMetadata: true,
//         // });
//
//         if (!result.matches || result.matches.length === 0) {
//             return res.json({ answer: "Sorry, I couldn't find an answer to your question." });
//         }
//
//         // Build context
//         const context = result.matches
//             .map((m) => `Q: ${m.metadata?.title}\nA: ${m.metadata?.content}`)
//             .join("\n\n");
//
//         // Ask Gemini
//         const prompt = `User asked: "${query}"\n\nHere are some FAQ entries:\n${context}\n\nPlease provide the best possible answer based on these FAQs.`;
//
//         const response = await llm.invoke(prompt);
//
//         res.json({
//             answer: typeof response.content === "string"
//                 ? response.content
//                 : response.content[0]?.text,
//             sources: result.matches.map((m) => ({
//                 id: m.id,
//                 title: m.metadata?.title,
//                 category: m.metadata?.category,
//                 score: m.score,
//             })),
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

// --- Pinecone setup ---
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = "product-catalog-index";
let index;

// Ensure index exists
async function ensureIndex() {
    const existingIndexes = await pc.listIndexes();
    if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
        await pc.createIndex({
            name: indexName,
            dimension: 768,
            metric: "dotproduct",
            spec: { serverless: { cloud: "aws", region: "us-east-1" } },
        });

        // Wait until ready
        let ready = false;
        while (!ready) {
            const desc = await pc.describeIndex(indexName);
            ready = desc.status.ready;
            if (!ready) await new Promise((r) => setTimeout(r, 1000));
        }
    }
    index = pc.Index(indexName);
}
await ensureIndex();

// --- Embedding model ---
const embedModel = new GoogleGenerativeAIEmbeddings({
    model: "models/embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
});

// --- LLM model (Gemini) ---
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash", // fast + cheap, or use gemini-pro
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.3,
});

// --- Utility: Sync JSON with Pinecone ---
async function syncWithPinecone(docs) {
    try {
        if (!docs || !Array.isArray(docs) || docs.length === 0) {
            throw new Error("No documents provided for syncing");
        }

        console.log(`Syncing ${docs.length} documents...`);

        const ids = docs.map((d) => d[0]);
        const texts = docs.map((d) => d[1]);
        const metadatas = docs.map((d) => d[2]);

        // Filter out empty texts
        const validDocs = texts.map((text, i) => ({ text, id: ids[i], metadata: metadatas[i] }))
            .filter(doc => doc.text && doc.text.trim().length > 0);

        if (validDocs.length === 0) {
            throw new Error("No valid documents with text content found");
        }

        console.log(`Processing ${validDocs.length} valid documents...`);

        // Get embeddings for valid texts
        const validTexts = validDocs.map(doc => doc.text);
        const embeddings = await embedModel.embedDocuments(validTexts);

        console.log(`Generated ${embeddings.length} embeddings`);

        // Create vectors array with proper structure
        const vectors = embeddings.map((embedding, i) => ({
            id: String(validDocs[i].id), // Ensure ID is string
            values: embedding,
            metadata: validDocs[i].metadata || {},
        }));

        // Validate vectors before upserting
        for (let i = 0; i < vectors.length; i++) {
            const vector = vectors[i];
            if (!vector.id || !Array.isArray(vector.values) || vector.values.length === 0) {
                console.error(`Invalid vector at index ${i}:`, vector);
                throw new Error(`Invalid vector structure at index ${i}`);
            }
        }

        console.log(`Upserting ${vectors.length} vectors to Pinecone...`);

        // Use the correct upsert format for newer Pinecone SDK
        await index.upsert(vectors);

        console.log("Successfully upserted vectors to Pinecone");

        return { message: `Upserted ${vectors.length} vectors into Pinecone ✅` };
    } catch (error) {
        console.error("Error in syncWithPinecone:", error);
        throw error;
    }
}

// --- Routes ---

// 1. Upload JSON Data
export const syncJSON = async (req, res) => {
    try {
        const raw = req.body; // expects JSON array

        // Validate input
        if (!raw) {
            return res.status(400).json({ error: "Request body is required" });
        }

        // Handle different input formats
        let records;
        if (Array.isArray(raw)) {
            records = raw;
        } else if (raw.data && Array.isArray(raw.data)) {
            records = raw.data;
        } else if (raw.records && Array.isArray(raw.records)) {
            records = raw.records;
        } else if (typeof raw === 'object') {
            // If it's a single object, wrap it in an array
            records = [raw];
        } else {
            return res.status(400).json({
                error: "Invalid input format. Expected an array of objects or an object with 'data' or 'records' property containing an array."
            });
        }

        if (records.length === 0) {
            return res.status(400).json({ error: "No records found to process" });
        }

        console.log(`Processing ${records.length} records...`);

        const docs = records.map((item, i) => {
            const docId = String(item.id || i);
            const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;

            // Keep important fields in metadata for retrieval
            const metadata = {
                ...item,
                source: "json",
                // Ensure these key fields are preserved in metadata
                title: item.title || "",
                content: item.content || "",
                summary: item.summary || "",
                category: item.category || "",
            };

            // Only remove id from metadata to avoid conflicts
            delete metadata.id;

            return [docId, text.trim(), metadata];
        });

        const result = await syncWithPinecone(docs);
        res.json(result);
    } catch (err) {
        console.error("Error in syncJSON:", err);
        res.status(500).json({ error: err.message });
    }
};

// 2. Query endpoint - FIXED
export const promptJSON = async (req, res) => {
    try {
        const { query, topK = 3 } = req.body;

        if (!query || query.trim().length === 0) {
            return res.status(400).json({ error: "Query is required" });
        }

        console.log(`Searching for: "${query}"`);

        const embedding = await embedModel.embedQuery(query);
        console.log(`Generated embedding with ${embedding.length} dimensions`);

        const result = await index.query({
            vector: embedding,
            topK,
            includeMetadata: true,
        });

        console.log(`Found ${result.matches?.length || 0} matches`);

        if (!result.matches || result.matches.length === 0) {
            return res.json({ answer: "Sorry, I couldn't find any relevant information to answer your question." });
        }

        // Debug: Log the matches to see what data we're getting
        console.log("Matches found:", result.matches.map(m => ({
            id: m.id,
            score: m.score,
            title: m.metadata?.title,
            content: m.metadata?.content,
            category: m.metadata?.category
        })));

        // Build context with better formatting
        const context = result.matches
            .filter(m => m.metadata && (m.metadata.title || m.metadata.content)) // Filter out empty matches
            .map((m, index) => {
                const title = m.metadata?.title || `FAQ ${index + 1}`;
                const content = m.metadata?.content || m.metadata?.summary || "No content available";
                return `${index + 1}. ${title}\n${content}`;
            })
            .join("\n\n");

        console.log("Built context:", context);

        if (!context || context.trim().length === 0) {
            return res.json({
                answer: "I found some potentially relevant entries, but they don't contain enough information to answer your question properly.",
                // sources: result.matches.map((m) => ({
                //     id: m.id,
                //     title: m.metadata?.title,
                //     category: m.metadata?.category,
                //     score: m.score,
                // }))
            });
        }

        // Create a more effective prompt
        const prompt = `Based on the following FAQ information, please answer the user's question: "${query}"
FAQ Information:
${context}

Instructions:
- Provide a helpful, accurate answer based on the FAQ content above
- If the information is incomplete, mention what additional details might be needed
- Be direct and concise
- If no relevant information is found, say so clearly

Answer:`;

        console.log("Sending prompt to LLM...");
        const response = await llm.invoke(prompt);

        const answer = typeof response.content === "string"
            ? response.content
            : response.content[0]?.text || "I couldn't generate a proper response.";

        res.json({
            answer: answer,
            // sources: result.matches.map((m) => ({
            //     id: m.id,
            //     title: m.metadata?.title || "Untitled",
            //     category: m.metadata?.category || "Uncategorized",
            //     score: m.score,
            // })),
        });
    } catch (err) {
        console.error("Error in promptJSON:", err);
        res.status(500).json({ error: err.message });
    }
};
