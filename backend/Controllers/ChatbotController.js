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
// import { Pinecone } from "@pinecone-database/pinecone";
// import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import dotenv from "dotenv";
// import Profile from "../Models/Profile.js";
// import {User} from "../Models/Registration.js";
// import { Document,Comment } from "../Models/DiscussionForms.js";
// import Event from "../Models/Events.js";
// import {Oppurtunity} from "../Models/Oppurtunity.js";
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
//
//             // Keep important fields in metadata for retrieval
//             const metadata = {
//                 ...item,
//                 source: "json",
//                 // Ensure these key fields are preserved in metadata
//                 title: item.title || "",
//                 content: item.content || "",
//                 summary: item.summary || "",
//                 category: item.category || "",
//             };
//
//             // Only remove id from metadata to avoid conflicts
//             delete metadata.id;
//
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
// function sanitizeMetadata(obj) {
//     const clean = {}
//     for(const [key,value] of Object.entries(obj)) {
//         if(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
//             clean[key] = value
//         }
//         else if(Array.isArray(value)) {
//             clean[key] = value.every(v => typeof v  === "string") ? value : value.map(v => String(v))
//         }
//         else if(value && typeof value === "object"){
//             clean[key] = JSON.stringify(value)
//         }else{
//             clean[key] = value
//         }
//     }
//     return clean
// }
//
// export const  syncFromMongo = async (req,res) => {
//     try {
//         let allDocs = [];
//
//         // --- Sync Profiles ---
//         const profiles = await Profile.find().populate('userId');
//         const profilesDocs = profiles.map((profile, i) => {
//             const docId = String(profile._id || i);
//             const text = `${profile.firstName || ""} ${profile.lastName || ""} ${profile.email || ""} ${profile.phone || ""} ${profile.address || ""} ${profile.city || ""} ${profile.state || ""} ${profile.zip || ""} ${profile.country || ""} ${profile.userId || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...profile.toObject() || profile,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         console.log(profilesDocs)
//         allDocs.push(...profilesDocs);
//
//         // --- Sync Users ---
//         const users = await User.find();
//         const usersDocs = users.map((user, i) => {
//             const docId = String(user._id || i);
//             const text = `${user.firstName || ""} ${user.lastName || ""} ${user.email || ""} ${user.phone || ""} ${user.address || ""} ${user.city || ""} ${user.state || ""} ${user.zip || ""} ${user.country || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...user.toObject?.() || user,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...usersDocs);
//
//         // --- Sync Discussions ---
//         const discussions = await Document.find().populate('authorId');
//         const discussionDocs = discussions.map((d, i) => {
//             const docId = String(d._id || i);
//             const text = `${d.title || ""} ${d.content || ""} ${d.authorId || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...d.toObject?.() || d,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...discussionDocs);
//
//         // --- Sync Events ---
//         const events = await Event.find().populate('authorId');
//         const eventsDocs = events.map((e, i) => {
//             const docId = String(e._id || i);
//             const text = `${e.title || ""} ${e.content || ""} ${e.authorId || ""}`;
//
//             const metadata = sanitizeMetadata(
//                 {
//                     ...e.toObject?.() || e,
//                     source: "mongo",
//                 }
//             );
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...eventsDocs);
//
//         // --- Sync Opportunities ---
//         const opportunities = await Oppurtunity.find().populate('authorId');
//         const opportunitiesDocs = opportunities.map((o, i) => {
//             const docId = String(o._id || i);
//             const text = `${o.title || ""} ${o.content || ""} ${o.authorId || ""}`;
//
//             const metadata = sanitizeMetadata(
//                 {
//                     ...o.toObject?.() || o,
//                     source: "mongo",
//                 }
//             );
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...opportunitiesDocs);
//
//         console.log(`Prepared ${allDocs.length} documents for Pinecone`);
//
//         // --- Sync with Pinecone ---
//         const result = await syncWithPinecone(allDocs);
//         return res.json(result);
//        // return result;
//
//     } catch (e) {
//         console.error("Error in syncFromMongo:", e);
//         throw e;
//     }
// }
//
// // 2. Query endpoint - FIXED
// export const promptJSON = async (req, res) => {
//     try {
//         const { query, topK = 3 } = req.body;
//
//         if (!query || query.trim().length === 0) {
//             return res.status(400).json({ error: "Query is required" });
//         }
//
//         console.log(`Searching for: "${query}"`);
//
//         const embedding = await embedModel.embedQuery(query);
//         console.log(`Generated embedding with ${embedding.length} dimensions`);
//
//         const result = await index.query({
//             vector: embedding,
//             topK,
//             includeMetadata: true,
//         });
//
//         console.log(`Found ${result.matches?.length || 0} matches`);
//
//         if (!result.matches || result.matches.length === 0) {
//             return res.json({ answer: "Sorry, I couldn't find any relevant information to answer your question." });
//         }
//
//         // Debug: Log the matches to see what data we're getting
//         console.log("Matches found:", result.matches.map(m => ({
//             id: m.id,
//             score: m.score,
//             title: m.metadata?.title,
//             content: m.metadata?.content,
//             category: m.metadata?.category
//         })));
//
//         // Build context with better formatting
//         const context = result.matches
//             .filter(m => m.metadata && (m.metadata.title || m.metadata.content)) // Filter out empty matches
//             .map((m, index) => {
//                 const title = m.metadata?.title || `FAQ ${index + 1}`;
//                 const content = m.metadata?.content || m.metadata?.summary || "No content available";
//                 return `${index + 1}. ${title}\n${content}`;
//             })
//             .join("\n\n");
//
//         console.log("Built context:", context);
//
//         if (!context || context.trim().length === 0) {
//             return res.json({
//                 answer: "I found some potentially relevant entries, but they don't contain enough information to answer your question properly.",
//                 // sources: result.matches.map((m) => ({
//                 //     id: m.id,
//                 //     title: m.metadata?.title,
//                 //     category: m.metadata?.category,
//                 //     score: m.score,
//                 // }))
//             });
//         }
//
//         // Create a more effective prompt
//         const prompt = `Based on the following information, please answer the user's question: "${query}"
// FAQ Information:
// ${context}
//
// Instructions:
// - Provide a helpful, accurate answer based on the content above
// - If the information is incomplete, mention what additional details might be needed
// - Be direct and concise
// - If no relevant information is found, say so clearly
// - You are Chatbot and you need to answer based on the information provided and the database used is mongodb please provide the answer based on the information provided `;`
//
// Answer:`;
//
//         console.log("Sending prompt to LLM...");
//         const response = await llm.invoke(prompt);
//
//         const answer = typeof response.content === "string"
//             ? response.content
//             : response.content[0]?.text || "I couldn't generate a proper response.";
//
//         res.json({
//             answer: answer,
//             // sources: result.matches.map((m) => ({
//             //     id: m.id,
//             //     title: m.metadata?.title || "Untitled",
//             //     category: m.metadata?.category || "Uncategorized",
//             //     score: m.score,
//             // })),
//         });
//     } catch (err) {
//         console.error("Error in promptJSON:", err);
//         res.status(500).json({ error: err.message });
//     }
// };
// import { Pinecone } from "@pinecone-database/pinecone";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { pipeline } from "@xenova/transformers";
// import dotenv from "dotenv";
// import Profile from "../Models/Profile.js";
// import {User} from "../Models/Registration.js";
// import { Document,Comment } from "../Models/DiscussionForms.js";
// import Event from "../Models/Events.js";
// import {Oppurtunity} from "../Models/Oppurtunity.js";
//
// dotenv.config();
//
// // --- Pinecone setup ---
// const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const indexName = "product-catalog-index";
// let index;
//
// // --- Sentence Transformers setup ---
// let embedModel;
//
// // Initialize the embedding model
// async function initializeEmbedModel() {
//     if (!embedModel) {
//         console.log("Loading Sentence Transformer model...");
//         embedModel = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
//         console.log("Embedding model loaded successfully");
//     }
//     return embedModel;
// }
//
// // Helper function to generate embeddings
// async function generateEmbedding(text) {
//     const model = await initializeEmbedModel();
//     const output = await model(text, { pooling: 'mean', normalize: true });
//     return Array.from(output.data);
// }
//
// // Helper function to generate embeddings for multiple texts
// async function generateEmbeddings(texts) {
//     const embeddings = [];
//     for (const text of texts) {
//         const embedding = await generateEmbedding(text);
//         embeddings.push(embedding);
//     }
//     return embeddings;
// }
//
// // Ensure index exists (updated dimension for all-MiniLM-L6-v2)
// async function ensureIndex() {
//     const existingIndexes = await pc.listIndexes();
//     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
//         await pc.createIndex({
//             name: indexName,
//             dimension: 384, // all-MiniLM-L6-v2 produces 384-dimensional embeddings
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
//         // Get embeddings for valid texts using Sentence Transformers
//         const validTexts = validDocs.map(doc => doc.text);
//         const embeddings = await generateEmbeddings(validTexts);
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
//
//             // Keep important fields in metadata for retrieval
//             const metadata = {
//                 ...item,
//                 source: "json",
//                 // Ensure these key fields are preserved in metadata
//                 title: item.title || "",
//                 content: item.content || "",
//                 summary: item.summary || "",
//                 category: item.category || "",
//             };
//
//             // Only remove id from metadata to avoid conflicts
//             delete metadata.id;
//
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
// function sanitizeMetadata(obj) {
//     const clean = {}
//     for(const [key,value] of Object.entries(obj)) {
//         if(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
//             clean[key] = value
//         }
//         else if(Array.isArray(value)) {
//             clean[key] = value.every(v => typeof v  === "string") ? value : value.map(v => String(v))
//         }
//         else if(value && typeof value === "object"){
//             clean[key] = JSON.stringify(value)
//         }else{
//             clean[key] = value
//         }
//     }
//     return clean
// }
//
// export const  syncFromMongo = async (req,res) => {
//     try {
//         let allDocs = [];
//
//         // --- Sync Profiles ---
//         const profiles = await Profile.find().populate('userId');
//         const profilesDocs = profiles.map((profile, i) => {
//             const docId = String(profile._id || i);
//             const text = `${profile.firstName || ""} ${profile.lastName || ""} ${profile.email || ""} ${profile.phone || ""} ${profile.address || ""} ${profile.city || ""} ${profile.state || ""} ${profile.zip || ""} ${profile.country || ""} ${profile.userId || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...profile.toObject() || profile,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         console.log(profilesDocs)
//         allDocs.push(...profilesDocs);
//
//         // --- Sync Users ---
//         const users = await User.find();
//         const usersDocs = users.map((user, i) => {
//             const docId = String(user._id || i);
//             const text = `${user.firstName || ""} ${user.lastName || ""} ${user.email || ""} ${user.phone || ""} ${user.address || ""} ${user.city || ""} ${user.state || ""} ${user.zip || ""} ${user.country || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...user.toObject?.() || user,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...usersDocs);
//
//         // --- Sync Discussions ---
//         const discussions = await Document.find().populate('authorId');
//         const discussionDocs = discussions.map((d, i) => {
//             const docId = String(d._id || i);
//             const text = `${d.title || ""} ${d.content || ""} ${d.authorId || ""}`;
//
//             const metadata = sanitizeMetadata({
//                 ...d.toObject?.() || d,
//                 source: "mongo",
//             })
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...discussionDocs);
//
//         // --- Sync Events ---
//         const events = await Event.find().populate('authorId');
//         const eventsDocs = events.map((e, i) => {
//             const docId = String(e._id || i);
//             const text = `${e.title || ""} ${e.content || ""} ${e.authorId || ""}`;
//
//             const metadata = sanitizeMetadata(
//                 {
//                     ...e.toObject?.() || e,
//                     source: "mongo",
//                 }
//             );
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...eventsDocs);
//
//         // --- Sync Opportunities ---
//         const opportunities = await Oppurtunity.find().populate('authorId');
//         const opportunitiesDocs = opportunities.map((o, i) => {
//             const docId = String(o._id || i);
//             const text = `${o.title || ""} ${o.content || ""} ${o.authorId || ""}`;
//
//             const metadata = sanitizeMetadata(
//                 {
//                     ...o.toObject?.() || o,
//                     source: "mongo",
//                 }
//             );
//             delete metadata._id;
//
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...opportunitiesDocs);
//
//         console.log(`Prepared ${allDocs.length} documents for Pinecone`);
//
//         // --- Sync with Pinecone ---
//         const result = await syncWithPinecone(allDocs);
//         return res.json(result);
//         // return result;
//
//     } catch (e) {
//         console.error("Error in syncFromMongo:", e);
//         throw e;
//     }
// }
//
// // 2. Query endpoint - Updated to use Sentence Transformers
// export const promptJSON = async (req, res) => {
//     try {
//         const { query, topK = 3 } = req.body;
//
//         if (!query || query.trim().length === 0) {
//             return res.status(400).json({ error: "Query is required" });
//         }
//
//         console.log(`Searching for: "${query}"`);
//
//         // Generate embedding using Sentence Transformers
//         const embedding = await generateEmbedding(query);
//         console.log(`Generated embedding with ${embedding.length} dimensions`);
//
//         const result = await index.query({
//             vector: embedding,
//             topK,
//             includeMetadata: true,
//         });
//
//         console.log(`Found ${result.matches?.length || 0} matches`);
//
//         if (!result.matches || result.matches.length === 0) {
//             return res.json({ answer: "Sorry, I couldn't find any relevant information to answer your question." });
//         }
//
//         // Debug: Log the matches to see what data we're getting
//         console.log("Matches found:", result.matches.map(m => ({
//             id: m.id,
//             score: m.score,
//             title: m.metadata?.title,
//             content: m.metadata?.content,
//             category: m.metadata?.category
//         })));
//
//         // Build context with better formatting
//         const context = result.matches
//             .filter(m => m.metadata && (m.metadata.title || m.metadata.content)) // Filter out empty matches
//             .map((m, index) => {
//                 const title = m.metadata?.title || `FAQ ${index + 1}`;
//                 const content = m.metadata?.content || m.metadata?.summary || "No content available";
//                 return `${index + 1}. ${title}\n${content}`;
//             })
//             .join("\n\n");
//
//         console.log("Built context:", context);
//
//         if (!context || context.trim().length === 0) {
//             return res.json({
//                 answer: "I found some potentially relevant entries, but they don't contain enough information to answer your question properly.",
//                 // sources: result.matches.map((m) => ({
//                 //     id: m.id,
//                 //     title: m.metadata?.title,
//                 //     category: m.metadata?.category,
//                 //     score: m.score,
//                 // }))
//             });
//         }
//
//         // Create a more effective prompt
//         const prompt = `Based on the following information, please answer the user's question: "${query}"
// FAQ Information:
// ${context}
//
// Instructions:
// - Provide a helpful, accurate answer based on the content above
// - If the information is incomplete, mention what additional details might be needed
// - Be direct and concise
// - If no relevant information is found, say so clearly
// - You are Chatbot and you need to answer based on the information provided and the database used is mongodb please provide the answer based on the information provided
//
// Answer:`;
//
//         console.log("Sending prompt to LLM...");
//         const response = await llm.invoke(prompt);
//
//         const answer = typeof response.content === "string"
//             ? response.content
//             : response.content[0]?.text || "I couldn't generate a proper response.";
//
//         res.json({
//             answer: answer,
//             // sources: result.matches.map((m) => ({
//             //     id: m.id,
//             //     title: m.metadata?.title || "Untitled",
//             //     category: m.metadata?.category || "Uncategorized",
//             //     score: m.score,
//             // })),
//         });
//     } catch (err) {
//         console.error("Error in promptJSON:", err);
//         res.status(500).json({ error: err.message });
//     }
// };
// OPTION 2: Simple TF-IDF based embeddings (lightweight alternative)
// import { Pinecone } from "@pinecone-database/pinecone";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import natural from 'natural';
// import dotenv from "dotenv";
// import Profile from "../Models/Profile.js";
// import {User} from "../Models/Registration.js";
// import { Document,Comment } from "../Models/DiscussionForms.js";
// import Event from "../Models/Events.js";
// import {Oppurtunity} from "../Models/Oppurtunity.js";
//
// dotenv.config();
//
// // --- Pinecone setup ---
// const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const indexName = "product-catalog-index";
// let index;
//
// // --- TF-IDF Embedding setup ---
// const TfIdf = natural.TfIdf;
// let tfidf = new TfIdf();
// let vocabulary = [];
// let isTrained = false;
//
// // Helper function to preprocess text
// function preprocessText(text) {
//     return text
//         .toLowerCase()
//         .replace(/[^\w\s]/g, ' ')
//         .replace(/\s+/g, ' ')
//         .trim();
// }
//
// // Generate TF-IDF embedding
// function generateTfIdfEmbedding(text, dimension = 300) {
//     const processedText = preprocessText(text);
//     const tokens = natural.WordTokenizer().tokenize(processedText) || [];
//
//     // Create a sparse vector representation
//     const vector = new Array(dimension).fill(0);
//
//     tokens.forEach((token, index) => {
//         if (vocabulary.includes(token)) {
//             const vocabIndex = vocabulary.indexOf(token);
//             const position = vocabIndex % dimension;
//             vector[position] += 1;
//         }
//     });
//
//     // Normalize the vector
//     const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
//     if (magnitude > 0) {
//         return vector.map(val => val / magnitude);
//     }
//
//     return vector;
// }
//
// // Build vocabulary from all documents
// function buildVocabulary(texts) {
//     const allWords = new Set();
//
//     texts.forEach(text => {
//         const processedText = preprocessText(text);
//         const tokens = natural.WordTokenizer().tokenize(processedText) || [];
//         tokens.forEach(token => {
//             if (token.length > 2) { // Filter out very short words
//                 allWords.add(token);
//             }
//         });
//     });
//
//     vocabulary = Array.from(allWords).slice(0, 10000); // Limit vocabulary size
//     console.log(`Built vocabulary with ${vocabulary.length} words`);
// }
//
// // Generate embeddings for multiple texts
// async function generateEmbeddings(texts) {
//     if (!isTrained) {
//         buildVocabulary(texts);
//         isTrained = true;
//     }
//
//     return texts.map(text => generateTfIdfEmbedding(text));
// }
//
// // Generate single embedding
// async function generateEmbedding(text) {
//     return generateTfIdfEmbedding(text);
// }
//
// // Ensure index exists (300 dimensions for TF-IDF)
// async function ensureIndex() {
//     const existingIndexes = await pc.listIndexes();
//     if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
//         await pc.createIndex({
//             name: indexName,
//             dimension: 300, // Custom dimension for TF-IDF
//             metric: "cosine", // Cosine similarity works better for TF-IDF
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
// // --- LLM model (Gemini) ---
// const llm = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-flash",
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
//         const embeddings = await generateEmbeddings(validTexts);
//
//         console.log(`Generated ${embeddings.length} embeddings`);
//
//         // Create vectors array with proper structure
//         const vectors = embeddings.map((embedding, i) => ({
//             id: String(validDocs[i].id),
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
// // ... (Rest of the routes remain the same as in the previous examples)
//
// // 1. Upload JSON Data
// export const syncJSON = async (req, res) => {
//     try {
//         const raw = req.body;
//
//         if (!raw) {
//             return res.status(400).json({ error: "Request body is required" });
//         }
//
//         let records;
//         if (Array.isArray(raw)) {
//             records = raw;
//         } else if (raw.data && Array.isArray(raw.data)) {
//             records = raw.data;
//         } else if (raw.records && Array.isArray(raw.records)) {
//             records = raw.records;
//         } else if (typeof raw === 'object') {
//             records = [raw];
//         } else {
//             return res.status(400).json({
//                 error: "Invalid input format."
//             });
//         }
//
//         if (records.length === 0) {
//             return res.status(400).json({ error: "No records found to process" });
//         }
//
//         const docs = records.map((item, i) => {
//             const docId = String(item.id || i);
//             const text = `${item.title || ""} ${item.summary || ""} ${item.content || ""}`;
//             const metadata = {
//                 ...item,
//                 source: "json",
//                 title: item.title || "",
//                 content: item.content || "",
//                 summary: item.summary || "",
//                 category: item.category || "",
//             };
//             delete metadata.id;
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
// function sanitizeMetadata(obj) {
//     const clean = {}
//     for(const [key,value] of Object.entries(obj)) {
//         if(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
//             clean[key] = value
//         }
//         else if(Array.isArray(value)) {
//             clean[key] = value.every(v => typeof v  === "string") ? value : value.map(v => String(v))
//         }
//         else if(value && typeof value === "object"){
//             clean[key] = JSON.stringify(value)
//         }else{
//             clean[key] = value
//         }
//     }
//     return clean
// }
//
// export const syncFromMongo = async (req,res) => {
//     try {
//         let allDocs = [];
//
//         // Collect all documents (same as before)
//         const profiles = await Profile.find().populate('userId');
//         const profilesDocs = profiles.map((profile, i) => {
//             const docId = String(profile._id || i);
//             const text = `${profile.firstName || ""} ${profile.lastName || ""} ${profile.email || ""} ${profile.phone || ""} ${profile.address || ""} ${profile.city || ""} ${profile.state || ""} ${profile.zip || ""} ${profile.country || ""} ${profile.userId || ""}`;
//             const metadata = sanitizeMetadata({
//                 ...profile.toObject() || profile,
//                 source: "mongo",
//             })
//             delete metadata._id;
//             return [docId, text.trim(), metadata];
//         });
//         allDocs.push(...profilesDocs);
//
//         // ... (Add other collections similarly)
//
//         console.log(`Prepared ${allDocs.length} documents for Pinecone`);
//         const result = await syncWithPinecone(allDocs);
//         return res.json(result);
//
//     } catch (e) {
//         console.error("Error in syncFromMongo:", e);
//         throw e;
//     }
// }
//
// export const promptJSON = async (req, res) => {
//     try {
//         const { query, topK = 3 } = req.body;
//
//         if (!query || query.trim().length === 0) {
//             return res.status(400).json({ error: "Query is required" });
//         }
//
//         console.log(`Searching for: "${query}"`);
//
//         const embedding = await generateEmbedding(query);
//         console.log(`Generated embedding with ${embedding.length} dimensions`);
//
//         const result = await index.query({
//             vector: embedding,
//             topK,
//             includeMetadata: true,
//         });
//
//         if (!result.matches || result.matches.length === 0) {
//             return res.json({ answer: "Sorry, I couldn't find any relevant information." });
//         }
//
//         const context = result.matches
//             .filter(m => m.metadata && (m.metadata.title || m.metadata.content))
//             .map((m, index) => {
//                 const title = m.metadata?.title || `Item ${index + 1}`;
//                 const content = m.metadata?.content || m.metadata?.summary || "No content available";
//                 return `${index + 1}. ${title}\n${content}`;
//             })
//             .join("\n\n");
//
//         const prompt = `Answer this question based on the information: "${query}"\n\nInformation:\n${context}\n\nAnswer:`;
//
//         const response = await llm.invoke(prompt);
//         const answer = typeof response.content === "string" ? response.content : response.content[0]?.text || "No response generated.";
//
//         res.json({ answer });
//     } catch (err) {
//         console.error("Error in promptJSON:", err);
//         res.status(500).json({ error: err.message });
//     }
// };
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as tf from '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import dotenv from "dotenv";
import Profile from "../Models/Profile.js";
import {User} from "../Models/Registration.js";
import { Document,Comment } from "../Models/DiscussionForms.js";
import Event from "../Models/Events.js";
import {Oppurtunity} from "../Models/Oppurtunity.js";

dotenv.config();

// --- Pinecone setup ---
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = "mongodb-chatbot-index";
let index;

// --- Universal Sentence Encoder setup ---
let embedModel;

async function initializeEmbedModel() {
    if (!embedModel) {
        console.log("🤖 Loading Universal Sentence Encoder model...");
        console.log("📥 This may take a few minutes on first run (downloading ~100MB model)...");

        try {
            embedModel = await use.load();
            console.log("✅ Universal Sentence Encoder loaded successfully!");
        } catch (error) {
            console.error("❌ Error loading embedding model:", error);
            throw new Error(`Failed to load Universal Sentence Encoder: ${error.message}`);
        }
    }
    return embedModel;
}

// Generate embedding for single text
async function generateEmbedding(text) {
    try {
        const model = await initializeEmbedModel();

        if (!text || text.trim().length === 0) {
            throw new Error("Text cannot be empty for embedding generation");
        }

        // Generate embedding
        const embeddings = await model.embed([text.trim()]);
        const embeddingData = await embeddings.data();

        // Clean up memory
        embeddings.dispose();

        return Array.from(embeddingData);

    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}

// Generate embeddings for multiple texts with batching
async function generateEmbeddings(texts) {
    try {
        const model = await initializeEmbedModel();

        // Filter valid texts
        const validTexts = texts.filter(text => text && text.trim().length > 0);

        if (validTexts.length === 0) {
            throw new Error("No valid texts provided for embedding");
        }

        console.log(`🔄 Generating embeddings for ${validTexts.length} texts...`);

        // Process in batches to manage memory
        const batchSize = 32; // Optimal batch size for Universal Sentence Encoder
        const allEmbeddings = [];

        for (let i = 0; i < validTexts.length; i += batchSize) {
            const batch = validTexts.slice(i, i + batchSize);
            const batchNum = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(validTexts.length / batchSize);

            console.log(`📊 Processing batch ${batchNum}/${totalBatches} (${batch.length} texts)`);

            // Generate embeddings for this batch
            const batchEmbeddings = await model.embed(batch);
            const batchData = await batchEmbeddings.data();

            // Universal Sentence Encoder outputs 512-dimensional embeddings
            const dimension = 512;
            for (let j = 0; j < batch.length; j++) {
                const start = j * dimension;
                const end = start + dimension;
                const embedding = Array.from(batchData.slice(start, end));
                allEmbeddings.push(embedding);
            }

            // Clean up batch memory
            batchEmbeddings.dispose();

            // Small delay to prevent overwhelming the system
            if (batchNum < totalBatches) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        console.log(`✅ Successfully generated ${allEmbeddings.length} embeddings`);
        return allEmbeddings;

    } catch (error) {
        console.error("Error generating batch embeddings:", error);
        throw error;
    }
}

// Ensure Pinecone index exists
async function ensureIndex() {
    try {
        const existingIndexes = await pc.listIndexes();

        if (!existingIndexes.indexes.some((idx) => idx.name === indexName)) {
            console.log(`🏗️ Creating Pinecone index: ${indexName}`);

            await pc.createIndex({
                name: indexName,
                dimension: 512, // Universal Sentence Encoder dimension
                metric: "cosine",
                spec: {
                    serverless: {
                        cloud: "aws",
                        region: "us-east-1"
                    }
                },
            });

            // Wait for index to be ready
            console.log("⏳ Waiting for index to be ready...");
            let ready = false;
            let attempts = 0;
            const maxAttempts = 120; // Wait up to 2 minutes

            while (!ready && attempts < maxAttempts) {
                try {
                    const desc = await pc.describeIndex(indexName);
                    ready = desc.status.ready;

                    if (!ready) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        attempts++;
                        if (attempts % 10 === 0) {
                            console.log(`⏳ Still waiting... (${attempts}s elapsed)`);
                        }
                    }
                } catch (error) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    attempts += 2;
                }
            }

            if (!ready) {
                throw new Error("Index creation timed out after 2 minutes");
            }

            console.log("✅ Index created and ready!");
        } else {
            console.log("✅ Pinecone index already exists");
        }

        index = pc.Index(indexName);

    } catch (error) {
        console.error("Error ensuring index:", error);
        throw error;
    }
}

// Initialize index on startup
await ensureIndex();

// --- LLM setup ---
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.3,
});

// Utility: Sync documents with Pinecone
async function syncWithPinecone(docs) {
    try {
        if (!docs || !Array.isArray(docs) || docs.length === 0) {
            throw new Error("No documents provided for syncing");
        }

        console.log(`\n🚀 Starting sync of ${docs.length} documents...`);

        // Extract document components
        const ids = docs.map(d => d[0]);
        const texts = docs.map(d => d[1]);
        const metadatas = docs.map(d => d[2]);

        // Filter valid documents
        const validDocs = [];
        for (let i = 0; i < texts.length; i++) {
            if (texts[i] && texts[i].trim().length > 0) {
                validDocs.push({
                    id: ids[i],
                    text: texts[i].trim(),
                    metadata: metadatas[i] || {}
                });
            }
        }

        if (validDocs.length === 0) {
            throw new Error("No valid documents with text content found");
        }

        console.log(`📝 Processing ${validDocs.length} valid documents (${docs.length - validDocs.length} skipped)`);

        // Generate embeddings
        const validTexts = validDocs.map(doc => doc.text);
        const embeddings = await generateEmbeddings(validTexts);

        if (embeddings.length !== validDocs.length) {
            throw new Error(`Embedding count mismatch: expected ${validDocs.length}, got ${embeddings.length}`);
        }

        // Prepare vectors for Pinecone
        const vectors = embeddings.map((embedding, i) => {
            return {
                id: String(validDocs[i].id),
                values: embedding,
                metadata: {
                    ...validDocs[i].metadata,
                    originalText: validDocs[i].text.substring(0, 1000) // Store first 1000 chars for reference
                }
            };
        });

        // Validate vectors
        console.log("🔍 Validating vectors...");
        for (let i = 0; i < vectors.length; i++) {
            const vector = vectors[i];
            if (!vector.id || !Array.isArray(vector.values) || vector.values.length !== 512) {
                throw new Error(`Invalid vector at index ${i}: id=${vector.id}, dimensions=${vector.values?.length}`);
            }
        }

        // Upsert to Pinecone in batches
        console.log(`📤 Upserting ${vectors.length} vectors to Pinecone...`);
        const upsertBatchSize = 100;
        let totalUpserted = 0;

        for (let i = 0; i < vectors.length; i += upsertBatchSize) {
            const batch = vectors.slice(i, i + upsertBatchSize);

            try {
                await index.upsert(batch);
                totalUpserted += batch.length;
                console.log(`📊 Upserted: ${totalUpserted}/${vectors.length} vectors`);
            } catch (error) {
                console.error(`❌ Error upserting batch starting at index ${i}:`, error);
                throw error;
            }
        }

        const result = {
            message: `✅ Successfully upserted ${totalUpserted} vectors to Pinecone!`,
            processed: totalUpserted,
            skipped: docs.length - validDocs.length,
            total: docs.length
        };

        console.log(result.message);
        return result;

    } catch (error) {
        console.error("❌ Error in syncWithPinecone:", error);
        throw error;
    }
}

// Helper: Sanitize metadata for Pinecone
function sanitizeMetadata(obj) {
    const clean = {};

    for (const [key, value] of Object.entries(obj)) {
        // Skip private fields and functions
        if (key.startsWith('_') || typeof value === 'function') {
            continue;
        }

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            clean[key] = value;
        } else if (Array.isArray(value)) {
            // Convert array elements to strings if needed
            clean[key] = value.map(v => typeof v === 'string' ? v : String(v));
        } else if (value && typeof value === 'object') {
            // Convert objects to JSON strings
            try {
                clean[key] = JSON.stringify(value);
            } catch (e) {
                clean[key] = String(value);
            }
        } else if (value !== null && value !== undefined) {
            clean[key] = String(value);
        }
    }

    return clean;
}

// --- API Routes ---

// 1. Sync JSON data
export const syncJSON = async (req, res) => {
    try {
        console.log("\n🎯 JSON Sync Request Received");
        const raw = req.body;

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
            records = [raw];
        } else {
            return res.status(400).json({
                error: "Invalid input format. Expected array or object with data/records property."
            });
        }

        if (records.length === 0) {
            return res.status(400).json({ error: "No records found to process" });
        }

        console.log(`📋 Processing ${records.length} JSON records...`);

        // Prepare documents
        const docs = records.map((item, i) => {
            const docId = String(item.id || `json_${i}`);

            // Combine text fields
            const textFields = [
                item.title,
                item.name,
                item.summary,
                item.content,
                item.description,
                item.text
            ].filter(field => field && typeof field === 'string' && field.trim().length > 0);

            const combinedText = textFields.join(' ').trim();

            // Prepare metadata
            const metadata = sanitizeMetadata({
                ...item,
                source: "json",
                type: "json_record"
            });
            delete metadata.id; // Remove id to avoid conflicts

            return [docId, combinedText, metadata];
        });

        // Sync with Pinecone
        const result = await syncWithPinecone(docs);
        res.json(result);

    } catch (err) {
        console.error("❌ Error in syncJSON:", err);
        res.status(500).json({
            error: "Internal server error during JSON sync",
            details: process.env.NODE_ENV === 'development' ? err.message : 'Please try again'
        });
    }
};

// 2. Sync MongoDB collections
export const syncFromMongo = async (req, res) => {
    try {
        console.log("\n🗄️ MongoDB Sync Request Received");
        let allDocs = [];

        // Sync Profiles
        console.log("👤 Fetching Profiles...");
        try {
            const profiles = await Profile.find().populate('userId');
            const profileDocs = profiles.map(profile => {
                const docId = String(profile._id);
                const textParts = [
                    profile.firstName,
                    profile.lastName,
                    profile.email,
                    profile.phone,
                    profile.address,
                    profile.city,
                    profile.state,
                    profile.country
                ].filter(part => part && part.trim().length > 0);

                const text = textParts.join(' ');
                const metadata = sanitizeMetadata({
                    ...profile.toObject(),
                    source: "mongo",
                    type: "profile"
                });
                delete metadata._id;

                return [docId, text, metadata];
            });

            allDocs.push(...profileDocs);
            console.log(`✅ Added ${profileDocs.length} profiles`);
        } catch (error) {
            console.log(`⚠️ Error fetching profiles: ${error.message}`);
        }

        // Sync Users
        console.log("👥 Fetching Users...");
        try {
            const users = await User.find();
            const userDocs = users.map(user => {
                const docId = String(user._id);
                const textParts = [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phone,
                    user.address,
                    user.city,
                    user.state,
                    user.country
                ].filter(part => part && part.trim().length > 0);

                const text = textParts.join(' ');
                const metadata = sanitizeMetadata({
                    ...(user.toObject ? user.toObject() : user),
                    source: "mongo",
                    type: "user"
                });
                delete metadata._id;

                return [docId, text, metadata];
            });

            allDocs.push(...userDocs);
            console.log(`✅ Added ${userDocs.length} users`);
        } catch (error) {
            console.log(`⚠️ Error fetching users: ${error.message}`);
        }

        // Sync Discussions
        console.log("💬 Fetching Discussions...");
        try {
            const discussions = await Document.find().populate('authorId');
            const discussionDocs = discussions.map(doc => {
                const docId = String(doc._id);
                const textParts = [
                    doc.title,
                    doc.content,
                    doc.summary,
                    doc.description
                ].filter(part => part && part.trim().length > 0);

                const text = textParts.join(' ');
                const metadata = sanitizeMetadata({
                    ...(doc.toObject ? doc.toObject() : doc),
                    source: "mongo",
                    type: "discussion"
                });
                delete metadata._id;

                return [docId, text, metadata];
            });

            allDocs.push(...discussionDocs);
            console.log(`✅ Added ${discussionDocs.length} discussions`);
        } catch (error) {
            console.log(`⚠️ Error fetching discussions: ${error.message}`);
        }

        // Sync Events
        console.log("📅 Fetching Events...");
        try {
            const events = await Event.find().populate('authorId');
            const eventDocs = events.map(event => {
                const docId = String(event._id);
                const textParts = [
                    event.title,
                    event.content,
                    event.description,
                    event.location
                ].filter(part => part && part.trim().length > 0);

                const text = textParts.join(' ');
                const metadata = sanitizeMetadata({
                    ...(event.toObject ? event.toObject() : event),
                    source: "mongo",
                    type: "event"
                });
                delete metadata._id;

                return [docId, text, metadata];
            });

            allDocs.push(...eventDocs);
            console.log(`✅ Added ${eventDocs.length} events`);
        } catch (error) {
            console.log(`⚠️ Error fetching events: ${error.message}`);
        }

        // Sync Opportunities
        console.log("🎯 Fetching Opportunities...");
        try {
            const opportunities = await Oppurtunity.find().populate('authorId');
            const opportunityDocs = opportunities.map(opp => {
                const docId = String(opp._id);
                const textParts = [
                    opp.title,
                    opp.content,
                    opp.description,
                    opp.requirements
                ].filter(part => part && part.trim().length > 0);

                const text = textParts.join(' ');
                const metadata = sanitizeMetadata({
                    ...(opp.toObject ? opp.toObject() : opp),
                    source: "mongo",
                    type: "opportunity"
                });
                delete metadata._id;

                return [docId, text, metadata];
            });

            allDocs.push(...opportunityDocs);
            console.log(`✅ Added ${opportunityDocs.length} opportunities`);
        } catch (error) {
            console.log(`⚠️ Error fetching opportunities: ${error.message}`);
        }

        console.log(`\n📊 Total documents prepared: ${allDocs.length}`);

        if (allDocs.length === 0) {
            return res.status(400).json({
                error: "No documents found in MongoDB collections",
                message: "Please check your database connection and ensure collections have data"
            });
        }

        // Sync with Pinecone
        const result = await syncWithPinecone(allDocs);
        res.json(result);

    } catch (error) {
        console.error("❌ Error in syncFromMongo:", error);
        res.status(500).json({
            error: "Internal server error during MongoDB sync",
            details: process.env.NODE_ENV === 'development' ? error.message : 'Please try again'
        });
    }
};

// 3. Query endpoint
export const promptJSON = async (req, res) => {
    try {
        const { query, topK = 5 } = req.body;

        if (!query || query.trim().length === 0) {
            return res.status(400).json({ error: "Query is required" });
        }

        console.log(`\n🔍 Processing query: "${query}"`);

        // Generate query embedding
        const queryEmbedding = await generateEmbedding(query);
        console.log(`✅ Generated query embedding (${queryEmbedding.length} dimensions)`);

        // Search Pinecone
        const searchResults = await index.query({
            vector: queryEmbedding,
            topK: Math.min(topK, 10),
            includeMetadata: true,
        });

        console.log(`🎯 Found ${searchResults.matches?.length || 0} matches`);

        if (!searchResults.matches || searchResults.matches.length === 0) {
            return res.json({
                answer: "I couldn't find any relevant information to answer your question. Please try rephrasing your query or ask about something else.",
                matches: 0,
                query: query
            });
        }

        // Build context from results
        const context = searchResults.matches
            .filter(match => match.metadata)
            .slice(0, 5) // Limit context to top 5 results
            .map((match, index) => {
                const title = match.metadata?.title || match.metadata?.name || `Item ${index + 1}`;
                const content = match.metadata?.content ||
                    match.metadata?.description ||
                    match.metadata?.originalText ||
                    "No content available";
                const type = match.metadata?.type || 'item';
                const source = match.metadata?.source || 'database';

                return `${index + 1}. [${type.toUpperCase()}] ${title}\n${content}\n(Source: ${source}, Relevance: ${(match.score * 100).toFixed(1)}%)\n`;
            })
            .join('\n');

        // Generate response with LLM
        const prompt = `You are a helpful AI assistant for a platform that manages profiles, users, discussions, events, and opportunities. Based on the search results below, provide a comprehensive and helpful answer to the user's question.

USER QUESTION: "${query}"

SEARCH RESULTS:
${context}

INSTRUCTIONS:
- Provide a clear, helpful answer based on the search results
- Be specific and mention relevant details from the results
- If information is limited, mention what additional details might be helpful
- Maintain a friendly and professional tone
- If no directly relevant information is found, suggest related topics
- Give the answer in a concise and easy-to-understand format and in plain text

Your response:`;

        console.log("🤖 Generating response with LLM...");
        const llmResponse = await llm.invoke(prompt);

        const answer = typeof llmResponse.content === "string"
            ? llmResponse.content
            : llmResponse.content[0]?.text || "I apologize, but I couldn't generate a proper response.";

        // Prepare response
        const sources = searchResults.matches.map(match => ({
            id: match.id,
            title: match.metadata?.title || match.metadata?.name || "Untitled",
            type: match.metadata?.type || "Unknown",
            source: match.metadata?.source || "database",
            relevance: Number((match.score * 100).toFixed(1))
        }));

        const response = {
            answer: answer,
            sources: sources,
            matches: searchResults.matches.length,
            query: query
        };

        console.log("✅ Response generated successfully");
        res.json(response);

    } catch (error) {
        console.error("❌ Error in promptJSON:", error);
        res.status(500).json({
            error: "An error occurred while processing your query",
            details: process.env.NODE_ENV === 'development' ? error.message : 'Please try again'
        });
    }
};
