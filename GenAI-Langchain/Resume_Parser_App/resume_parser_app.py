import os
import json
import streamlit as strlt

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader,Docx2txtLoader,TextLoader
