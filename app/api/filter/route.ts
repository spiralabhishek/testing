import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import models from '@/models';

const { PostModel, UserModel, BoardModel } = models;

interface FilterOptions {
  [key: string]: any;
}

interface Filter {
  entity: string;
  options: FilterOptions;
  page?: number;
  limit?: number;
}

await dbConnect();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (!searchParams.has('entity')) {
    return NextResponse.json({ error: 'Entity is required' }, { status: 403 });
  }

  const filter: Filter = {
    entity: searchParams.get('entity') ?? '',
    options: {},
    page: parseInt(searchParams.get('page') ?? '1', 10),
    limit: parseInt(searchParams.get('limit') ?? '10', 10),
  };

  // Location-based filters
  if (searchParams.has('city')) filter.options['Location.city'] = searchParams.get('city');
  if (searchParams.has('address')) filter.options['Location.address'] = searchParams.get('address');
  if (searchParams.has('remote')) filter.options['Location.remote'] = searchParams.get('remote') === 'true';
  if (searchParams.has('radiusKm')) filter.options['Location.radiusKm'] = { $lte: Number(searchParams.get('radiusKm')) };
  if (searchParams.has('country')) filter.options['Location.country'] = { $lte: Number(searchParams.get('country')) };
  if (searchParams.has('zip')) filter.options['Location.zip'] = { $lte: Number(searchParams.get('zip')) };
  if (searchParams.has('lat') && searchParams.has('lng') && searchParams.has('radiusKm')) {
    filter.options['Location.coordinates'] = {
      $geoWithin: {
        $centerSphere: [
          [
            parseFloat(searchParams.get('lng') ?? '0'),
            parseFloat(searchParams.get('lat') ?? '0'),
          ],
          parseFloat(searchParams.get('radiusKm') ?? '0') / 6378.1,
        ],
      },
    };
  }

  // searchParams.forEach((value, key) => {
  //   if (!['entity', 'page', 'limit'].includes(key)) {
  //     filter.options[key] = value;
  //   }
  // });

  try {
    const skip = ((filter.page ?? 1) - 1) * (filter.limit ?? 10);
    const limit = filter.limit ?? 10;

    console.log(filter.options, skip, limit);

    let response;
    if (filter.entity === "User") {
      response = await UserModel.find(filter.options).skip(skip).limit(limit);
    } else if (filter.entity === "Post") {
      response = await PostModel.find(filter.options)
        .skip(skip)
        .limit(limit)
        .populate('postedBy', null, UserModel)
        .populate('board', null, BoardModel);
    } else {
      return NextResponse.json({ error: 'Entity not match' }, { status: 403 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching data', details: error.message }, { status: 500 });
  }
}
