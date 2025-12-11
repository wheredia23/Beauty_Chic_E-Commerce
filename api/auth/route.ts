// app/api/admin/auth/login/route.ts - CON SERIALIZACIÓN BIGINT
import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from "bcryptjs";
// import { prisma } from '@/app/lib/prisma';
import { SimpleTokenService } from '@/app/lib/server/auth/simple-token';

// ✅ FUNCIÓN DE SERIALIZACIÓN PARA BIGINT
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }
  
  if (typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value);
    }
    return result;
  }
  
  return obj;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Iniciando proceso de login...');
    
    const body = await request.json();
    const { email, password } = body;

    console.log('📧 Email recibido:', email);

    if (!email || !password) {
      console.log('❌ Faltan email o password');
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    /** 
    console.log('🔍 Buscando usuario en BD...');
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: true }
        }
      }
    });

    console.log('👤 Usuario encontrado:', user ? 'SÍ' : 'NO');
    
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      console.log('❌ Usuario sin password hash');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    console.log('🔑 Verificando contraseña...');
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    console.log('✅ Contraseña válida:', isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const userRoles = user.roles.map(ur => ur.role.name);
    console.log('🎭 Roles del usuario:', userRoles);
    
    const isAdmin = userRoles.includes('admin') || userRoles.includes('seller');
    console.log('👑 Es admin:', isAdmin);

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'No tiene permisos de administrador' },
        { status: 403 }
      );
    }

    // Generar token
    console.log('🔐 Generando token...');
    const token = await SimpleTokenService.generateToken({
      sub: user.id.toString(), // ✅ Convertir BigInt a string
      email: user.email,
      name: user.fullName || user.email,
      roles: userRoles
    });

    console.log('✅ Token generado exitosamente');

    // ✅ USAR SERIALIZACIÓN en la respuesta
    const responseData = serializeBigInt({
      success: true,
      data: {
        token: token,
        user: {
          id: user.id, // Este es un BigInt que necesita serialización
          email: user.email,
          name: user.fullName,
          roles: userRoles
        }
      }
    });

    // Crear respuesta con datos serializados
    const response = NextResponse.json(responseData);

    // Setear cookie Importante Revisar antes de produccion
    response.cookies.set('skatershop-admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    console.log('🎉 Login completado exitosamente para:', email);
    return response;
*/
  } catch (error) {
    console.error('💥 ERROR en login endpoint:', error);
    
    if (error instanceof Error) {
      console.error('💥 Error message:', error.message);
      console.error('💥 Error stack:', error.stack);
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }


}