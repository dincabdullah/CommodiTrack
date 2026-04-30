# 📈 CommodiTrack

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

CommodiTrack is a full-stack, real-time dashboard designed to monitor global commodity markets through US-listed ETFs. It combines real-time financial data streams with autonomous AI agents that scrape, analyze, and summarize market news, providing a unified, sentiment-aware trading intelligence platform.

## 🚀 Features

* **Real-Time Data Pipeline:** Streams live price updates for major commodity ETFs (Energy, Agriculture, Precious Metals) using WebSocket/REST integrations.
* **AI-Powered News Intelligence:** Autonomous agents scrape relevant financial news sources, utilizing LLMs to generate concise summaries and evaluate market sentiment (Bullish/Bearish/Neutral).
* **High-Performance Caching:** Implements Redis for efficient data buffering, reducing API latency and preventing rate-limit exhaustion from external providers.
* **Interactive Visualization:** Clean, responsive charting with dynamic timeframes (1D, 1W, 1M, 1Y) using TradingView Lightweight Charts.
* **Dockerized Architecture:** Fully containerized environment for seamless deployment and consistent development workflows.

## 🏗️ System Architecture

```text
[External Data]                 [Backend Services]                  [Frontend UI]
Finnhub / Alpha Vantage  ---->  Node.js + Express API  <-------->  React (Next.js)
                                      |         |                         |
                                      v         v                         v
                                [Upstash Redis Cache]             [Tailwind + Recharts]
                                      
[News Sources]                  [AI Agent Worker]
RSS Feeds / Web Scraper  ---->  Text Extraction
                                      |
                                      v
                                [Gemini / LLM API]  ----> Sentiment & Summary Output
