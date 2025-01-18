import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

export async function GET() {
  try {
    const records = await base('Ideas').select({
      view: 'Grid view'
    }).all();

    const ideas = records.map(record => ({
      id: record.id,
      title: record.get('title') || '',
      description: record.get('description') || '',
      difficulty: record.get('difficulty') || '',
      timeframe: record.get('timeframe') || '0',
      prize: record.get('prize') || '0',
      status: record.get('status') || 'Done',
      category: Array.isArray(record.get('category')) ? record.get('category') : [record.get('category') || 'Others'],
      comments: record.get('comments') || 0,
      tags: record.get('tags') || []
    }));

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' }, 
      { status: 500 }
    );
  }
}